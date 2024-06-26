import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	firstName: string
	@IsString()
	@IsNotEmpty()
	lastName: string
	@IsNumber()
	@IsNotEmpty()
	age: number
	@IsNotEmpty()
	@IsBoolean()
	issues: boolean
}
