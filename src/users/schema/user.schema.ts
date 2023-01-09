import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
  @Prop()
  _id: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  ftp: number
}

export const UserSchema = SchemaFactory.createForClass(User)
