import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Meal } from './schemas/meal.schema';
import type { Query } from 'express-serve-static-core';
import { mealCreateDto } from './dto/meal.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Border } from 'src/border/schemas/border.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel('meal')
    private mealModel: mongoose.Model<Meal>,
    @InjectModel('border')
    private borderModel: mongoose.Model<Border>,
  ) {}

  async findAll(query: Query): Promise<Meal[]> {
    const resPerPage = Number(query.size || 1);
    const currentPage = Number(query.page || 1);
    const skip = resPerPage * (currentPage - 1);
    const price = query.price ? { price: Number(query.price) } : {};

    const meals = await this.mealModel
      .find({ ...price })
      .limit(resPerPage)
      .skip(skip);
    return meals;
  }

  async create(meal: mealCreateDto, user: User): Promise<Meal> {
    const data = Object.assign(meal, {
      user: user._id,
      date: new Date().toISOString(),
    });
    const isMealExist = await this.mealModel.findOne({
      date: data.date,
      border: meal.border,
    });
    if (isMealExist) {
      throw new BadRequestException('Meal already create on this date');
    }
    // Border amount update
    await this.borderModel.updateOne(
      { _id: meal.border },
      { $inc: { mealCount: meal.mealCount } },
    );

    const res = await this.mealModel.create(data);
    return res;
  }
}
