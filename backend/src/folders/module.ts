import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Folder, FolderSchema } from "./schema";
import { FoldersController } from "./controller";
import { FoldersService } from "./service";
import { AuthModule } from "../auth/module";
import { UsersModule } from "src/users/module";
import { CardsModule } from "src/cards/module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
		AuthModule,
		UsersModule,
		CardsModule,
	],
	controllers: [FoldersController],
	providers: [FoldersService],
	exports: [FoldersService],
})
export class FoldersModule {}