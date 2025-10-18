import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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

  async findAll(query: Query): Promise<Border[]> {
    const resPerPage = Number(query.size || 1);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const price = query.price ? { price: Number(query.price) } : {};

    const books = await this.borderModel
      .find({ ...price })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async create(border: borderCreateDto, user: User): Promise<Border> {
    const data = Object.assign(border, { user: user._id });
    const isBorderExist = await this.borderModel.findOne({
      mobile: border.mobile,
    });

    if (isBorderExist) {
      throw new BadRequestException('Border with this mobile already exists');
    }

    const res = await this.borderModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Border> {
    const isVAlidate = mongoose.isValidObjectId(id);

    if (!isVAlidate) {
      throw new BadRequestException('Please enter correct id');
    }

    const border = await this.borderModel.findById(id);
    if (!border) {
      throw new NotFoundException('Border not found');
    }
    return border;
  }
}
