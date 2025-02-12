import { Controller, Get, Post, Body, Param, Delete, Put, Req, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from './service';
import { CreateUserDto, UpdateRolesDto, UpdateUserDto, SafeUserDto } from './dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public, Roles } from '../auth/decorator';
import { Role } from '../auth/enum';
import { AuthService } from '../auth/service';
import { Request } from 'express';
import { DefaultErrorResponse } from 'src/app/dto';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: SafeUserDto })
  @ApiBadRequestResponse({ type: DefaultErrorResponse })
  @Public()
  async create(@Body() user: CreateUserDto) {
	  return new SafeUserDto(await this.usersService.create(user));
  }

  @Get()
  @ApiOkResponse({ type: SafeUserDto, isArray: true })
  async findAll() {
	  return (await this.usersService.findAll()).map(user => new SafeUserDto(user));
  }

  @Get(':id')
  @ApiOkResponse({ type: SafeUserDto })
  @ApiNotFoundResponse({ type: DefaultErrorResponse })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) throw new NotFoundException('User not found');

	  return new SafeUserDto(user);
  }

  @Put(':id')
  @ApiOkResponse({ type: SafeUserDto })
  @ApiNotFoundResponse({ type: DefaultErrorResponse })
  @ApiUnauthorizedResponse({ type: DefaultErrorResponse })
  async update(@Req() request: Request, @Param('id') id: string, @Body() body: UpdateUserDto) {
    if (!this.userIsOwnerOrAdmin(request, id)) {
      throw new UnauthorizedException('You are not allowed to update this user');
    }

	  const user = await this.usersService.update(id, body);

    if (!user) throw new NotFoundException('User not found');

    return new SafeUserDto(user);
  }

  @Post(':id/role')
  @Roles(Role.Admin)
  @ApiOkResponse({ type: SafeUserDto })
  @ApiNotFoundResponse({ type: DefaultErrorResponse })
  async updateRole(@Param('id') id: string, @Body() roles: UpdateRolesDto) {
	  const user = await this.usersService.update(id, {roles: roles.roles});

    if (!user) throw new NotFoundException('User not found');

    return new SafeUserDto(user);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: DefaultErrorResponse })
  @ApiUnauthorizedResponse({ type: DefaultErrorResponse })
  async remove(@Req() request: Request, @Param('id') id: string) {
    if (!this.userIsOwnerOrAdmin(request, id)) {
      throw new UnauthorizedException('You are not allowed to remove this user');
    }

	  const user = this.usersService.remove(id);

    if (!user) throw new NotFoundException('User not found');
  }

  async userIsOwnerOrAdmin(request: Request, userId: string) {
    const user = await this.authService.getUserFromRequest(request);

    if (!user) return false;

    return user.id === userId || await this.usersService.isAdmin(user.id);
  }
}