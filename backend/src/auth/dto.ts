import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthPairDto {
	@ApiProperty()
	@IsNotEmpty()
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;
}

export class TokenPairDto {
	@ApiProperty()
	access: string;

	@ApiProperty()
	refresh: string;
}

export class RefreshTokenDto {
	@ApiProperty()
	@IsNotEmpty()
	refresh: string;
}