import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./schema";
import { CardsController } from "./controller";
import { CardsService } from "./service";
import { AuthModule } from "../auth/module";
import { UsersModule } from "src/users/module";
import { ExternalModule } from "src/external/module";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
		AuthModule,
		UsersModule,
		ExternalModule,
	],
	controllers: [CardsController],
	providers: [CardsService],
	exports: [CardsService],
})
export class CardsModule {}