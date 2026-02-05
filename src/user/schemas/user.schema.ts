import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  firstname: string;
  @Prop({
    required: false,
    trim: true,
    lowercase: true,
  })
  lastname?: string;
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    enum: {
      values: ['user', 'admin'],
      default: 'user',
      message: 'Role must be either user or admin',
    },
    default : "user"
  })
  role: 'user' | 'admin';
}

export const userSchema = SchemaFactory.createForClass(User)
