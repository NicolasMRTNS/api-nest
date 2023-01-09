import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './users/schema/user.schema'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ]
})
export class AppModule {}
