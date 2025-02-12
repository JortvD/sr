import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema()
export class Folder {
	@Prop({required: true, type: Types.ObjectId, ref: 'User'})
	owner: string;

	@Prop({required: true})
	path: string[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);