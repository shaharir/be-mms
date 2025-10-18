import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class mealCreateDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value))
  readonly border: Types.ObjectId;

  @IsOptional()
  @IsDateString()
  readonly date: string;

  @IsNotEmpty()
  @IsNumber()
  readonly mealCount: number;
}
