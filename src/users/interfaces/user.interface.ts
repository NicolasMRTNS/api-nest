import { Document } from 'mongoose'

export interface IUser extends Document {
  readonly _id: string
  readonly email: string
  readonly password: string
  readonly height: number
  readonly weight: number
  readonly ftp: number
}
