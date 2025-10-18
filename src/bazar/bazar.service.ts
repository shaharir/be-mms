import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Bazar } from './schemas/bazar.schemas';
import type { Query } from 'express-serve-static-core';
import { bazarCreateDto } from './dto/bazar.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BazarService {
  constructor(
    @InjectModel('bazar')
    private bazarModel: mongoose.Model<Bazar>,
  ) {}

  async findAll(query: Query): Promise<Bazar[]> {
    const resPerPage = Number(query.size || 1);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const price = query.price ? { price: Number(query.price) } : {};

    const books = await this.bazarModel
      .find({ ...price })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async create(bazar: bazarCreateDto, user: User): Promise<Bazar> {
    const data = Object.assign(bazar, { user: user._id });

    const isBazarExist = await this.bazarModel.findOne({ date: bazar.date });
    if (isBazarExist) {
      throw new BadRequestException('Bazar already create on this date');
    }

    const res = await this.bazarModel.create(data);
    return res;
  }
}
