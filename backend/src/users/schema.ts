import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({unique: true, required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);