import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';
import { Border } from 'src/border/schemas/border.schema';
import { paymentCreateDto } from './dto/payment.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Payment } from './schemas/payment.schemas';
import { Query } from 'express-serve-static-core';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('payment')
    private paymentModel: mongoose.Model<Payment>,
    @InjectModel('border')
    private borderModel: mongoose.Model<Border>,
    @InjectConnection() private readonly connection: Connection,
  ) {}
  async findAll(query: Query): Promise<Payment[]> {
    const searchTerm = query.search;
    const searchFilter = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { mobile: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};

    const payments = await this.paymentModel.find({ ...searchFilter });

    return payments;
  }

  async paymentCreate(payment: paymentCreateDto, user: User): Promise<Payment> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const data = Object.assign(payment, {
        user: user._id,
      });

      if (payment?.type == 'return') {
        // Border amount update
        await this.borderModel.updateOne(
          { _id: payment.border },
          { $inc: { amount: -payment.amount } },
          { session },
        );
      } else {
        // Border amount update
        await this.borderModel.updateOne(
          { _id: payment.border },
          { $inc: { amount: payment.amount } },
          { session },
        );
      }

      const res = new this.paymentModel(data);
      await res.save({ session });
      //   const res = await this.paymentModel.create([data], { session });
      await session.commitTransaction();

      return res;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
