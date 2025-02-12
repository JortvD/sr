import { ApiProperty } from "@nestjs/swagger";
import { FolderDocument } from "./schema";
import { IsMongoId } from "class-validator";

export class FolderDto {
	@ApiProperty()
  @IsMongoId()
	id: string;

	@ApiProperty()
  @IsMongoId()
	owner: string;

	@ApiProperty()
	path: string[];

	constructor(folder: FolderDocument) {
		this.id = folder.id;
		this.owner = folder.owner;
		this.path = folder.path;
	}
}

export class SetFolderDto {
	@ApiProperty()
	path: string[];
}