import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, {
    message: 'please enter a valid Bangladeshi mobile number',
  })
  readonly mobile: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
