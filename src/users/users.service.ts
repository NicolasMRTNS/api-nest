import { Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  // GET
  async findAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find()
    if (!userData || userData.length === 0) {
      throw new NotFoundException('User data not found.')
    }
    return userData
  }

  // POST
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto)
    return await newUser.save()
  }
}
