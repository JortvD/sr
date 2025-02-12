import { Injectable } from "@nestjs/common";
import { Card, CardDocument } from "./schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as moment from "moment";

@Injectable()
export class CardsService {
	constructor(@InjectModel(Card.name) private readonly cardModel: Model<CardDocument>) {}

	async create(card: Card): Promise<CardDocument> {
		return this.cardModel.create(card);
	}

	async findAll(): Promise<CardDocument[]> {
		return this.cardModel.find().exec();
	}

	async findOne(id: string): Promise<CardDocument|null> {
		return this.cardModel.findById(id).exec();
	}

	async findByFolder(folder: string): Promise<CardDocument[]> {
		return this.cardModel.find({ folder }).exec();
	}

	async findNextCard(owner: string): Promise<CardDocument|null> {
		const today = moment().endOf('day').toDate();
		return this.cardModel.findOne({ owner, dueDate: { $lte: today } }).sort({ dueDate: 1 }).exec();
	}

	async update(id: string, card: Partial<Card>): Promise<CardDocument|null> {
		return this.cardModel.findByIdAndUpdate(id, card, { new: true }).exec();
	}

	async remove(id: string): Promise<CardDocument|null> {
		return this.cardModel.findByIdAndDelete(id).exec();
	}
}