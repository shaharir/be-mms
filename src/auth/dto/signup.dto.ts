import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEmail({}, { message: 'please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

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
  @IsArray()
  readonly roles: Role[];
}
