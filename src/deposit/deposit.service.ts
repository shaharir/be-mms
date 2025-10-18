import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deposit } from './schemas/deposit.schema';
import mongoose from 'mongoose';
import { depositCreateDto } from './dto/deposit.dto';
import { User } from 'src/auth/schemas/user.schema';
import type { Query } from 'express-serve-static-core';
import { Border } from 'src/border/schemas/border.schema';

@Injectable()
export class DepositService {
  constructor(
    @InjectModel('deposit')
    private depositModel: mongoose.Model<Deposit>,
    @InjectModel('border')
    private borderModel: mongoose.Model<Border>,
  ) {}

  async findAll(query: Query): Promise<Deposit[]> {
    const resPerPage = Number(query.size || 1);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const price = query.price ? { price: Number(query.price) } : {};

    const deposits = await this.depositModel
      .find({ ...price })
      .limit(resPerPage)
      .skip(skip);
    return deposits;
  }

  async create(deposit: depositCreateDto, user: User): Promise<Deposit> {
    const data = Object.assign(deposit, { user: user._id });

    // Deposit create
    const createdDeposit = await this.depositModel.create(data);

    // Border amount update
    await this.borderModel.updateOne(
      { _id: deposit.border },
      { $inc: { amount: deposit.amount } },
    );

    return createdDeposit;
  }
}
