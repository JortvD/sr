import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY, ROLES_KEY } from "./decorator";
import { AuthService } from "./service";
import { UserAttachedRequest } from "./interface";
import { Role } from "./enum";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private authService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

		const request = context.switchToHttp().getRequest<UserAttachedRequest>();

		try {
			const user = await this.authService.getUserFromRequest(request);

			if (!user) {
				throw new UnauthorizedException('Invalid token');
			}
			
			request.user = user;
		} catch (e) {
			throw new UnauthorizedException('Invalid token');
		}

		return true;
	}
}

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private AuthService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		if (!requiredRoles) return true;

		const request = context.switchToHttp().getRequest<UserAttachedRequest>();
		const user = await this.AuthService.getUserFromRequest(request);

		if (!user) return false;
		
		return requiredRoles.some(role => user.roles?.includes(role));
	}
}