import { Body, Controller, NotFoundException, InternalServerErrorException, Post, Req, Get, Param, Delete, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "src/auth/service";
import { UsersService } from "src/users/service";
import { Request } from "express";
import { Card } from "./schema";
import { CardsService } from "./service";
import { CardDto, CardValueDto, CardVariantDto, CreateFromTextDto, ImproveFromTextDto, ReviewCardDto, SetCardDto } from "./dto";
import { OpenAIService } from "src/external/openai/service";
import { XMLParser } from "fast-xml-parser";
import { supermemo } from "supermemo";
import * as moment from "moment";
import { DefaultErrorResponse } from "src/app/dto";

interface VariantXML {
	question: string
	answer: string
}

interface CardXML {
	variant: (VariantXML[])|VariantXML|undefined
}

interface CardRootXML {
	flashcard: (CardXML[])|CardXML|undefined
}

interface ResultXML {
	root: CardRootXML|undefined
}

@Controller('cards')
@ApiBearerAuth()
export class CardsController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService,
		private readonly cardsService: CardsService,
		private readonly openaiService: OpenAIService
	) {}

	@Post()
	@ApiCreatedResponse({ type: CardDto })
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	async create(@Req() request: Request, @Body() card: SetCardDto) {
		const user = await this.authService.getUserFromRequest(request);
		
		if (!user) throw new NotFoundException('User not found');

		return new CardDto(await this.cardsService.create({
			...card,
			owner: user.id,
			createdAt: new Date(),
			dueDate: moment().startOf('day').toDate(),
			efactor: 2.5,
			interval: 0,
			repetition: 0
		}));
	}

	@Delete(':id')
	@ApiOkResponse()
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	async delete(@Req() request: Request, @Param('id') id: string) {
		const user = await this.authService.getUserFromRequest(request);

		if (!user) throw new NotFoundException('User not found');

		const card = await this.cardsService.findOne(id);

		if (!card) throw new NotFoundException('Card not found');

		if (!await this.userIsOwnerOrAdmin(request, card.owner)) throw new NotFoundException('User is not owner of card');

		return await this.cardsService.remove(id);
	}

	@Get('review')
	@ApiOkResponse({ type: CardDto })
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	async review(@Req() request: Request) {
		const user = await this.authService.getUserFromRequest(request);

		if (!user) throw new NotFoundException('User not found');

		const card = await this.cardsService.findNextCard(user.id);

		if (!card) throw new NotFoundException('No cards to review');

		return new CardDto(card);
	}

	@Get(':id')
	@ApiOkResponse({ type: CardDto })
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	async findOne(@Req() request: Request, @Param('id') id: string) {
		const card = await this.cardsService.findOne(id);

		if (!card) throw new NotFoundException('Card not found');

		if (!await this.userIsOwnerOrAdmin(request, card.owner)) throw new NotFoundException('User is not owner of card');

		return new CardDto(card);
	}

	@Put(':id')
	@ApiOkResponse({ type: CardDto })
	@ApiNotFoundResponse({ type: DefaultErrorResponse })
	async update(@Req() request: Request, @Param('id') id: string, @Body() body: SetCardDto) {
		let card = await this.cardsService.findOne(id);

		if (!card) throw new NotFoundException('Card not found');

		if (!await this.userIsOwnerOrAdmin(request, card.owner)) throw new NotFoundException('User is not owner of card');

		const updatedCard = await this.cardsService.update(id, body);

		if (!updatedCard) throw new NotFoundException('Failed to update card');

		return new CardDto(updatedCard);
	}

	@Post(':id/review')
	@ApiCreatedResponse({ type: CardDto })
	async reviewAnswer(@Req() request: Request, @Param('id') id: string, @Body() body: ReviewCardDto) {
		const user = await this.authService.getUserFromRequest(request);

		if (!user) throw new NotFoundException('User not found');

		const card = await this.cardsService.findOne(id);

		if (!card) throw new NotFoundException('Card not found');

		const memo = supermemo(card, body.grade);
		const updatedCard = await this.cardsService.update(id, {
			efactor: memo.efactor,
			interval: memo.interval,
			repetition: memo.repetition,
			dueDate: moment().add(memo.interval, 'days').toDate()
		});

		if (!updatedCard) throw new NotFoundException('Failed to update card');

		return new CardDto(updatedCard);
	}

	@Post('/from-text')
	@ApiCreatedResponse({ type: CardValueDto, isArray: true })
	async createFromText(@Body() body: CreateFromTextDto) {
		let content = await this.openaiService.createCompletion([
			{ role: 'system', content: 'You are an assistant that creates interesting flashcards. The text of your answers is allowed to include markdown and latex. It is important that the result is always formatted in XML with "root" as top element, with "flashcard" for each flashcard, each containing "variant" elements, each having a "question" and "answer" element.' },
			{ role: 'user', content: `Generate as many flascards as are interesting, and generate a number of variants for each flashcard. Make sure the answers are single pieces of information or short lists. Use the following text to create the flashcards from: ${body.text}` }
		], body.model);

		if (content === null) throw new NotFoundException('Failed to create flashcards');

		content = content.replace('```xml', '').replace('```', '');	

		return this.parseResultFromXML(new XMLParser().parse(content));
	}

	@Post('/improve-text')
	@ApiCreatedResponse({ type: CardValueDto, isArray: true })
	async improveFromText(@Body() body: ImproveFromTextDto) {
		let content = await this.openaiService.createCompletion([
			{ role: 'system', content: 'You are an assistant that creates interesting flashcards. The text of your questions and answers is allowed to include markdown and latex. It is important that the result is always formatted in XML with "root" as top element, with "flashcard" for each flashcard, each containing "variant" elements, each having a "question" and "answer" element.' },
			{ role: 'user', content: `Improve the following flascard, and generate multiple variants. Make sure your answer is short and does not repeat. The improved flashcard should be easy to memorize and should be insightful. \nQuestion: ${body.answer}\nAnswer: ${body.answer}` }
		], body.model);

		if (content === null) throw new NotFoundException('Failed to create flashcards');

		content = content.replace('```xml', '').replace('```', '');	

		return this.parseResultFromXML(new XMLParser().parse(content));
	}
	
	async userIsOwnerOrAdmin(request: Request, userId: string) {
		const user = await this.authService.getUserFromRequest(request);

		if (!user) return false;

		return user.id === userId || await this.usersService.isAdmin(user.id);
	}

	parseResultFromXML(result: ResultXML): CardValueDto[] {
		if (!result.root) throw new InternalServerErrorException('Invalid XML, no root element');
		if (!result.root.flashcard) throw new InternalServerErrorException('Invalid XML, no flashcard element');

		if (Array.isArray(result.root.flashcard)) {
			return result.root.flashcard.map((card: CardXML) => this.parseCardFromXML(card));
		} else {
			return [	this.parseCardFromXML(result.root.flashcard) ];
		}
	}
	
	parseCardFromXML(card: CardXML): CardValueDto {
		if (!card.variant) throw new InternalServerErrorException('Invalid XML, no variant element');

		if (Array.isArray(card.variant)) {
			return {
				variants: card.variant.map((variant: VariantXML) => this.parseVariantFromXML(variant))
			};
		} else {
			return {
				variants: [this.parseVariantFromXML(card.variant)]
			};
		}
	}

	parseVariantFromXML(variant: VariantXML): CardVariantDto {
		return {
			question: variant.question,
			answer: variant.answer
		}
	}
}