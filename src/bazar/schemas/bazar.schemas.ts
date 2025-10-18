import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Bazar extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Border', required: true })
  border: Types.ObjectId;

  @Prop()
  date: string;

  @Prop()
  roomNo: string;

  @Prop()
  note: string;
}

export const bazarSchema = SchemaFactory.createForClass(Bazar);
