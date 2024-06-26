import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	firstName: string
	@IsString()
	@IsOptional()
	lastName: string
	@IsNumber()
	@IsOptional()
	age: number
	@IsBoolean()
	@IsOptional()
	issues: boolean
}
