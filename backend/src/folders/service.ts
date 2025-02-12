import { Injectable } from "@nestjs/common";
import { Folder, FolderDocument } from "./schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class FoldersService {
	constructor(@InjectModel(Folder.name) private readonly folderModel: Model<FolderDocument>) {}

	async create(card: Folder): Promise<FolderDocument> {
		return this.folderModel.create(card);
	}

	async findAll(): Promise<FolderDocument[]> {
		return this.folderModel.find().exec();
	}

	async findOne(id: string): Promise<FolderDocument|null> {
		return this.folderModel.findById(id).exec();
	}

	async findByOwner(owner: string): Promise<FolderDocument[]> {
		return this.folderModel.find({ owner }).exec();
	}

	async update(id: string, card: Partial<Folder>): Promise<FolderDocument|null> {
		return this.folderModel.findByIdAndUpdate(id, card, { new: true }).exec();
	}

	async remove(id: string): Promise<FolderDocument|null> {
		return this.folderModel.findByIdAndDelete(id).exec();
	}
}