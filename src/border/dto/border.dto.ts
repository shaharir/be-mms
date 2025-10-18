import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class borderCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, {
    message: 'please enter a valid Bangladeshi mobile number',
  })
  readonly mobile: string;

  @IsNotEmpty()
  @IsString()
  readonly roomNo: string;

  @IsNotEmpty()
  @IsString()
  readonly note: string;

  @IsOptional()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsNumber()
  readonly mealCount: number;
}
