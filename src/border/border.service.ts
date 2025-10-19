import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Border } from './schemas/border.schema';
import type { Query } from 'express-serve-static-core';
import { borderCreateDto } from './dto/border.dto';
import { User } from 'src/auth/schemas/user.schema';
@Injectable()
export class BorderService {
  constructor(
    @InjectModel('border')
    private borderModel: mongoose.Model<Border>,
  ) {}

  async findAll(query: Query): Promise<{ data: Border[]; pagination: object }> {
    const resPerPage = Number(query.size);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const mobile = query.mobile ? { mobile: query.mobile } : {};
    const result = await this.borderModel.aggregate<{ totalCount: number }>([
      { $count: 'totalCount' },
    ]);
    // const totalAmount = await this.borderModel.aggregate<{
    //   totalAmount: number;
    // }>([
    //   {
    //     $group: {
    //       // _id: '$name',
    //       _id: null,
    //       totalAmount: { $sum: '$amount' },
    //       avgAmount: { $avg: '$amount' },
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);
    // const resultMatch = await this.borderModel.aggregate([
    //   { $match: { amount: { $gt: 800 } } },
    // ]);
    // const resultSort = await this.borderModel.aggregate([
    //   { $sort: { createdAt: -1 } },
    // ]);
    // const resultPagination = await this.borderModel.aggregate([
    //   { $skip: skip },
    //   { $limit: resPerPage },
    // ]);
    const pagination = {
      total: result[0].totalCount,
      resPerPage: resPerPage,
      totalPage: Math.ceil(result[0].totalCount / resPerPage),
    };

    const borders = await this.borderModel
      .find({ ...mobile })
      .limit(resPerPage)
      .skip(skip);
    return { data: borders, pagination: pagination };
  }

  async create(
    border: borderCreateDto,
    user: User,
  ): Promise<{ data: Border; code: number }> {
    const data = Object.assign(border, {
      user: user._id,
      amount: border.amount ?? 0,
      mealCount: border.mealCount ?? 0,
    });
    const isBorderExist = await this.borderModel.findOne({
      mobile: border.mobile,
    });

    if (isBorderExist) {
      throw new BadRequestException('Border with this mobile already exists');
    }

    const res = await this.borderModel.create(data);
    return { data: res, code: 200 };
  }

  async findById(id: Types.ObjectId): Promise<Border> {
    const border = await this.borderModel.findById(id);
    if (!border) {
      throw new NotFoundException('Border not found');
    }
    return border;
  }
}
