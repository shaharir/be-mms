import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Border', required: true })
  border: Types.ObjectId;

  @Prop()
  amount: number;

  @Prop()
  note: string;
}

export const paymentSchema = SchemaFactory.createForClass(Payment);
