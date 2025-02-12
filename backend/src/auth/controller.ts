import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service';
import { AuthPairDto, RefreshTokenDto, TokenPairDto } from './dto';
import { Public } from './decorator';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DefaultErrorResponse } from 'src/app/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('access')
  @Public()
  @ApiOkResponse({type: TokenPairDto})
  @ApiUnauthorizedResponse({ type: DefaultErrorResponse })
  async access(@Body() pair: AuthPairDto) {
    const tokens = await this.authService.access(pair.username, pair.password);

    if (!tokens) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return tokens;
  }

	@HttpCode(HttpStatus.OK)
	@Post('refresh')
  @Public()
  @ApiOkResponse({type: TokenPairDto})
  @ApiUnauthorizedResponse({ type: DefaultErrorResponse })
	async refresh(@Body() token: RefreshTokenDto) {
		const tokens = await this.authService.refresh(token.refresh);

    if (!tokens) {
      throw new UnauthorizedException('Invalid token');
    }

    return tokens;
	}
}
