import { HttpStatus, Injectable } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { IUser } from './interfaces/user.interface'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto'
import {
  ERROR_CREATE_USER,
  INVALID_CREDENTIALS,
  USER_NOT_FOUND
} from 'src/utils/ErrorMessagesUtils'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  // GET
  async findAllUsers(): Promise<IUser[]> {
    const userData: IUser[] = await this.userModel.find()
    if (!userData || userData.length === 0) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    return userData
  }

  async findOneUser(id: string): Promise<IUser> {
    const userData: IUser = await this.userModel.findById(id)
    if (!userData) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    return userData
  }

  // POST
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    let hash: string
    try {
      hash = await bcrypt.hash(createUserDto.password, process.env.SALT)
    } catch (exception) {
      throw new HttpException(ERROR_CREATE_USER, HttpStatus.BAD_REQUEST)
    }
    const userWithHash: CreateUserDto = { ...createUserDto, password: hash }
    const newUser: IUser = new this.userModel(userWithHash)
    return await newUser.save()
  }

  async login(loginUserDto: LoginUserDto): Promise<IUser> {
    try {
      const user: IUser = await this.userModel.findOne(loginUserDto)
      const isMatch: boolean = await bcrypt.compare(
        loginUserDto.password,
        user.password
      )
      if (!isMatch) {
        throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED)
      } else {
        return user
      }
    } catch (exception) {
      throw new HttpException(INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED)
    }
  }
}
