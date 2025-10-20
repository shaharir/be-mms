import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Border } from 'src/border/schemas/border.schema';
import { Deposit } from 'src/deposit/schemas/deposit.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('deposit')
    private depositModel: mongoose.Model<Deposit>,
    @InjectModel('border')
    private borderModel: mongoose.Model<Border>,
  ) {}

  async findAll(): Promise<any> {
    const totalBorder = await this.borderModel.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    const totalDeposit = await this.depositModel.aggregate([
      {
        $group: {
          _id: null,
          amount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Get the total safely
    const totalAmount = totalDeposit[0]?.amount ?? 0;
    const totalCount = totalDeposit[0]?.count ?? 0;
    const count = totalBorder[0]?.count ?? 0;

    // Create an object to return
    const border = { totalBorder: count };
    const deposit = { totalAmount: totalAmount, totalCount: totalCount };
    return { border, deposit };
  }
}
