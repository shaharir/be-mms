import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Bazar } from 'src/bazar/schemas/bazar.schemas';
import type { Query } from 'express-serve-static-core';
import { Deposit } from 'src/deposit/schemas/deposit.schema';
import { Border } from 'src/border/schemas/border.schema';
type BazarSummary = {
  _id: any;
  totalAmount: number;
  avgAmount: number;
  count: number;
};
@Injectable()
export class ReportService {
  constructor(
    @InjectModel('bazar')
    private bazarModel: mongoose.Model<Bazar>,
    @InjectModel('deposit')
    private depositModel: mongoose.Model<Deposit>,
    @InjectModel('border')
    private borderModel: mongoose.Model<Border>,
  ) {}

  async findAllBazar(
    query: Query,
  ): Promise<{ totalBazar: number; data: Bazar[] }> {
    const resPerPage = Number(query.size || 10);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const amountFilter = query.amount ? { amount: Number(query.amount) } : {};

    const bazarReports = await this.bazarModel
      .find({ ...amountFilter })
      .limit(resPerPage)
      .skip(skip);

    const totalBazar = bazarReports.reduce((acc, curr) => acc + curr.amount, 0);

    return {
      totalBazar,
      data: bazarReports,
    };
  }
  async findAllDeposit(
    query: Query,
  ): Promise<{ totalDeposit: number; data: Deposit[] }> {
    const resPerPage = Number(query.size || 10);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const amountFilter = query.amount ? { amount: Number(query.amount) } : {};

    const depositReports = await this.depositModel
      .find({ ...amountFilter })
      .limit(resPerPage)
      .skip(skip);

    const totalDeposit = depositReports.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    );

    return {
      totalDeposit,
      data: depositReports,
    };
  }

  async findAllBorder(query: Query): Promise<{
    totalAmount: number;
    totalMeal: number;
    amountPerMeal: number;
    data: Border[];
  }> {
    const resPerPage = Number(query.size || 10);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const amountFilter = query.amount ? { amount: Number(query.amount) } : {};

    const borderReports = await this.borderModel
      .find({ ...amountFilter })
      .limit(resPerPage)
      .skip(skip);

    const totalMeal = borderReports.reduce(
      (acc, curr) => acc + curr.mealCount,
      0,
    );
    const bazarReports = await this.bazarModel
      .find({ ...amountFilter })
      .limit(resPerPage)
      .skip(skip);

    const totalBazar = bazarReports.reduce((acc, curr) => acc + curr.amount, 0);

    const totalBazarAmount = await this.borderModel.aggregate<{
      totalAmount: number;
    }>([
      {
        $group: {
          // _id: '$name',
          _id: null,
          totalAmount: { $sum: '$amount' },
          avgAmount: { $avg: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);
    const totalAmount = totalBazarAmount[0].totalAmount;
    const amountPerMeal = totalBazar / totalMeal;
    const data = borderReports.map((border) => {
      border.totalCost = (border.mealCount || 0) * amountPerMeal;
      return border;
    });

    return {
      totalAmount,
      totalMeal,
      amountPerMeal,
      data,
    };
  }
}
