import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { hash } from 'bcrypt';

import { User, UserDocument } from "./schema";
import { Role } from "../auth/enum";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({username, password}: {username: string, password: string}): Promise<UserDocument> {
    const hashedPassword = await hash(password, 10);
    const newUser = new this.userModel({ 
      username, 
      password: hashedPassword, 
      roles: [] 
    });

    return newUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
	  return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument|null> {
  	return this.userModel.findById(id).exec();
  }

  async findOneByUsername(username: string): Promise<UserDocument|null> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: string, user: Partial<User>): Promise<UserDocument|null> {
	  return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: string): Promise<UserDocument|null> {
	  return this.userModel.findByIdAndDelete(id).exec();
  }
  
  async isAdmin(id: string): Promise<boolean> {
    return (await this.findOne(id))?.roles.includes(Role.Admin) || false;
  }
}