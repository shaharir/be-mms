import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class bazarCreateDto {
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
  @IsString()
  readonly note: string;
}
