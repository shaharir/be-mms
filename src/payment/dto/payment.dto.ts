import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class paymentCreateDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value))
  readonly border: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly note: string;

  @IsOptional()
  @IsString()
  readonly type: string;
}
