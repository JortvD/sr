import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { FolderDto, SetFolderDto } from "./dto";
import { FoldersService } from "./service";
import { DefaultErrorResponse } from "src/app/dto";
import { AuthService } from "src/auth/service";
import { Request } from "express";
import { FolderDocument } from "./schema";
import { UsersService } from "src/users/service";
import { CardsService } from "src/cards/service";
import { CardDto } from "src/cards/dto";

@Controller('folders')
@ApiBearerAuth()
export class FoldersController {
	constructor(
		private readonly folderService: FoldersService,
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
		private readonly cardsService: CardsService,
	) {}

	@Post()
	@ApiCreatedResponse({ type: FolderDto })
	async create(@Req() request: Request, @Body() card: SetFolderDto) {
		const user = await this.authService.getUserFromRequest(request);

		if (!user) throw new NotFoundException('User not found');

		return new FolderDto(await this.folderService.create({
			...card,
			owner: user.id
		}));
	}

	@Get()
	@ApiOkResponse({ type: FolderDto, isArray: true })
	async findAll(@Req() request: Request) {
		const user = await this.authService.getUserFromRequest(request);

		if (!user) throw new NotFoundException('User not found');

		return (await this.folderService.findByOwner(user.id)).map(folder => new FolderDto(folder));
	}

	@Get(':id')
	@ApiOkResponse({ type: FolderDto })
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	async findOne(@Req() request: Request, @Param('id') id: string) {
		const folder = await this.folderService.findOne(id);

		if (!folder) throw new NotFoundException('Folder not found');

		if (!await this.userIsOwnerOrAdmin(request, folder)) {
			throw new NotFoundException('Folder not found');
		}

		return new FolderDto(folder);
	}

	@Get(':id/cards')
	@ApiOkResponse({ type: CardDto, isArray: true })
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	async findCards(@Req() request: Request, @Param('id') id: string) {
		const folder = await this.folderService.findOne(id);

		if (!folder) throw new NotFoundException('Folder not found');

		if (!await this.userIsOwnerOrAdmin(request, folder)) {
			throw new NotFoundException('Folder not found');
		}

		return (await this.cardsService.findByFolder(id)).map(card => new CardDto(card));
	}

	@Put(':id')
	@ApiOkResponse({ type: FolderDto })
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	@ApiInternalServerErrorResponse({ type: DefaultErrorResponse })
	async update(@Req() request: Request, @Param('id') id: string, @Body() body: SetFolderDto) {
		let folder = await this.folderService.findOne(id);

		if (!folder) throw new NotFoundException('Folder not found');

		if (!await this.userIsOwnerOrAdmin(request, folder)) {
			throw new NotFoundException('Folder not found');
		}

		folder = await this.folderService.update(id, body);

		if (!folder) throw new InternalServerErrorException('Failed to update folder');

		return new FolderDto(folder);
	}

	@Delete(':id')
	@ApiOkResponse()
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	@ApiInternalServerErrorResponse({ type: DefaultErrorResponse })
	async remove(@Req() request: Request, @Param('id') id: string) {
		let folder = await this.folderService.findOne(id);

		if (!folder) throw new NotFoundException('Folder not found');

		if (!await this.userIsOwnerOrAdmin(request, folder)) {
			throw new NotFoundException('Folder not found');
		}

		folder = await this.folderService.remove(id);

		if (!folder) throw new InternalServerErrorException('Failed to remove folder');
	}

	async userIsOwnerOrAdmin(request: Request, folder: FolderDocument) {
			const user = await this.authService.getUserFromRequest(request);
	
			if (!user) return false;
	
			return user.id === folder.owner || await this.usersService.isAdmin(user.id);
		}
}