import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/service";
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

interface Payload {
	username: string;
	sub: string;
}

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async access(username: string, password: string) {
		const user = await this.usersService.findOneByUsername(username);

		if (!user) {
			return;
		}

		const match = await compare(password, user.password);

		if (!match) {
			return;
		}

		const payload = { sub: user.id, username: user.username };

		return {
			access: await this.jwtService.signAsync(payload, { expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION') ?? '1h' }),
			refresh: await this.jwtService.signAsync(payload, { expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') ?? '7d' }),
		}
	}

	async refresh(token: string) {
		try {
			const payload = this.jwtService.verify(token) as Payload;

			if (!payload) {
				return;
			}

			return {
				access: await this.jwtService.signAsync(payload, { expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION') ?? '1h' }),
				refresh: await this.jwtService.signAsync(payload, { expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') ?? '7d' }),
			}
		} catch {}
	}

	async getUserFromRequest(request: Request) {
		const token = this.extractTokenFromHeader(request);

		if(!token) return null;

		const payload = this.jwtService.verify(token);
		return this.usersService.findOne(payload.sub);
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}