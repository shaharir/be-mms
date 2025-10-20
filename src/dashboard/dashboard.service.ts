import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Border } from 'src/border/schemas/border.schema';
import { Deposit } from 'src/deposit/schemas/deposit.schema';
import { Meal } from 'src/meal/schemas/meal.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('deposit')
    private depositModel: mongoose.Model<Deposit>,
    @InjectModel('border')
    private borderModel: mongoose.Model<Border>,
    @InjectModel('meal')
    private mealModel: mongoose.Model<Meal>,
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
    const totalMeal = await this.mealModel.aggregate([
      {
        $group: {
          _id: null,
          mealCount: { $sum: '$mealCount' },
          count: { $sum: 1 },
        },
      },
    ]);
    // Get the total safely
    const totalMealCount = totalMeal[0]?.mealCount ?? 0;
    const mealTotal = totalMeal[0]?.count ?? 0;
    const totalAmount = totalDeposit[0]?.amount ?? 0;
    const totalCount = totalDeposit[0]?.count ?? 0;
    const count = totalBorder[0]?.count ?? 0;

    // Create an object to return
    const border = { totalBorder: count };
    const deposit = { totalAmount: totalAmount, totalCount: totalCount };
    const meal = { totalMealCount: totalMealCount, mealTotal: mealTotal };
    return { border, deposit, meal };
  }
}
