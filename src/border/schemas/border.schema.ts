import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Border extends Document {
  @Prop()
  name: string;

  @Prop()
  mobile: string;

  @Prop()
  roomNo: string;

  @Prop()
  note: string;
}

export const borderSchema = SchemaFactory.createForClass(Border);
