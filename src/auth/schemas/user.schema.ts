import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({
    unique: [true, 'Duplicate email enter'],
  })
  email: string;

  @Prop()
  mobile: string;

  @Prop()
  password: string;

  @Prop()
  roomNo: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.Border],
  })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
