import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  //Username
  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  username: string;

  //Email
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  //Password
  @Prop({
    required: true,
  })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
