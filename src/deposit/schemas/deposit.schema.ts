import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Deposit extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Border', required: true })
  border: Types.ObjectId;

  @Prop()
  date: string;

  @Prop()
  roomNo: string;

  @Prop()
  amount: number;

  @Prop()
  note: string;
}

export const depositSchema = SchemaFactory.createForClass(Deposit);
