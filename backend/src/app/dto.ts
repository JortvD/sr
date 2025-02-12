import { ApiProperty } from "@nestjs/swagger";

export class DefaultErrorResponse {
	@ApiProperty()
	statusCode: number;
	
	@ApiProperty()
	message: string;

	@ApiProperty()
	error: string;
}