import { ApiProperty } from "@nestjs/swagger";
import { CardDocument } from "./schema";
import { IsMongoId } from "class-validator";
import { SuperMemoGrade } from "supermemo";

export class CardVariantDto {
	@ApiProperty()
	question: string;

	@ApiProperty()
	answer: string;

	@ApiProperty()
	alternatives?: string[];
}

export class CardDto {
	@ApiProperty()
  @IsMongoId()
	id: string;

	@ApiProperty()
  @IsMongoId()
	owner: string;

	@ApiProperty()
  @IsMongoId()
	folder: string;

	@ApiProperty({type: CardVariantDto, isArray: true})
	variants: CardVariantDto[];

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	dueDate: Date;

	@ApiProperty()
	efactor: number;

	@ApiProperty()
	interval: number;

	@ApiProperty()
	repetition: number;

	constructor(card: CardDocument) {
		this.id = card.id;
		this.owner = card.owner;
		this.folder = card.folder;
		this.variants = card.variants;
		this.createdAt = card.createdAt;
		this.dueDate = card.dueDate;
		this.efactor = card.efactor;
		this.interval = card.interval;
		this.repetition = card.repetition;
	}
}

export class CardValueDto {
	@ApiProperty({type: CardVariantDto, isArray: true})
	variants: CardVariantDto[];
}

export class SetCardDto {
	@ApiProperty()
	@IsMongoId()
	folder: string;

	@ApiProperty({type: CardVariantDto, isArray: true})
	variants: CardVariantDto[];
}

export class CreateFromTextDto {
	@ApiProperty()
	text: string;

	@ApiProperty()
	model: string;
}

export class ImproveFromTextDto {
	@ApiProperty()
	question: string;

	@ApiProperty()
	answer: string;

	@ApiProperty()
	model: string;
}

export class ReviewCardDto {
	@ApiProperty()
	grade: SuperMemoGrade;
}