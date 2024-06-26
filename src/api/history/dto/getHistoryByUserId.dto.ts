import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class GetHistoryByUserIdDto {
	@IsNotEmpty()
	userId: number
	@IsOptional()
	page: number
	@IsOptional()
	offset: number
}
