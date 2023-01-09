import { Controller, Get, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { IUser } from './interfaces/user.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAllUsers()
  }

  @Post()
  create(createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.createUser(createUserDto)
  }
}
