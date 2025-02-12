import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CardVariant } from './interface';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
	@Prop({required: true, type: Types.ObjectId, ref: 'User'})
	owner: string;

	@Prop({required: true, type: Types.ObjectId, ref: 'Folder'})
	folder: string;

	@Prop({required: true})
	variants: CardVariant[];

	@Prop({required: true})
	interval: number;

	@Prop({required: true})
	efactor: number;

	@Prop({required: true})
	repetition: number;

	@Prop({required: true})
	dueDate: Date;

	@Prop({required: true})
	createdAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);