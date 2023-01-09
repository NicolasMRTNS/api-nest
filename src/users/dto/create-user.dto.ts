import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength
} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string
}
