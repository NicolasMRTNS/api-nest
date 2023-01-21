import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  height: number

  @IsNotEmpty()
  weight: number

  @IsNotEmpty()
  ftp: number
}
