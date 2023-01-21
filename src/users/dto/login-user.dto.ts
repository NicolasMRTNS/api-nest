import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string
}
