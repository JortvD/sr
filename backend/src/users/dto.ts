import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/auth/enum";
import { UserDocument } from "./schema";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  username: string;
}

export class UpdateRolesDto {
  @ApiProperty({ enum: Role, enumName: 'Role', isArray: true })
  @IsEnum(Role, { each: true })
  roles: Role[];
}

export class SafeUserDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  roles: Role[];
  
  constructor(user: UserDocument) {
    this.id = user.id;
    this.username = user.username;
    this.roles = user.roles;
  }
}