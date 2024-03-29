import { Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException } from '@nestjs/common/exceptions'
import {
  ERROR_CREATE_USER,
  ERROR_DELETE_USER,
  ERROR_LOGIN,
  ERROR_RETRIEVING_DATA
} from 'src/utils/ErrorMessagesUtils'
import { ID_URL, LOGIN_URL } from 'src/utils/UrlUtils'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { IUser } from './interfaces/user.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<IUser[]> {
    try {
      return this.usersService.findAllUsers()
    } catch (exception) {
      throw new HttpException(ERROR_RETRIEVING_DATA, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(ID_URL)
  findOne(@Param('id') id: string): Promise<IUser> {
    try {
      return this.usersService.findOneUser(id)
    } catch (exception) {
      throw new HttpException(ERROR_RETRIEVING_DATA, HttpStatus.BAD_REQUEST)
    }
  }

  @Post()
  create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      return this.usersService.createUser(createUserDto)
    } catch (exception) {
      throw new HttpException(ERROR_CREATE_USER, HttpStatus.BAD_REQUEST)
    }
  }

  @Post(LOGIN_URL)
  login(loginUserDto: LoginUserDto): Promise<IUser> {
    try {
      return this.usersService.login(loginUserDto)
    } catch (exception) {
      throw new HttpException(ERROR_LOGIN, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete()
  delete(@Param('id') id: string): string {
    try {
      this.usersService.delete(id)
      return `User ${id} deleted`
    } catch (exception) {
      throw new HttpException(ERROR_DELETE_USER, HttpStatus.BAD_REQUEST)
    }
  }
}
