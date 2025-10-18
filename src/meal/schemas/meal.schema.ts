import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Meal extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Border', required: true })
  border: Types.ObjectId;

  @Prop()
  mealCount: number;

  @Prop()
  date: string;
}

export const mealSchema = SchemaFactory.createForClass(Meal);
