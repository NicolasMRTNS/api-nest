import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsNumber
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

  @IsNumber()
  @IsNotEmpty()
  readonly height: number

  @IsNumber()
  @IsNotEmpty()
  readonly weight: number

  @IsNumber()
  @IsNotEmpty()
  readonly ftp: number
}
