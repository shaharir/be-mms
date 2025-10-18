import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class depositCreateDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value))
  readonly border: Types.ObjectId;

  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  readonly roomNo: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly note: string;
}
