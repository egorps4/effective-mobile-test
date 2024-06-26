import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, Patch, Post } from "@nestjs/common"
import { UserService } from "./user.service"
import { IUser } from "src/interfaces/user.interface"
import { CreateUserDto } from "./dto/create.dto"
import { CustomLogger } from "src/common/custom.logger"
import { UpdateUserDto } from "./dto/update.dto"
import { HistoryService } from "../history/history.service"

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly historyService: HistoryService,
		private readonly loggerService: CustomLogger
	) { }

	@Get("all")
	async getAllUsers(): Promise<IUser[]> {
		try {
			return await this.userService.findAll()
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserController getAllUsers", error })
			throw new InternalServerErrorException()
		}
	}

	@Post("")
	async createUser(@Body() body: CreateUserDto): Promise<IUser> {
		try {
			const user = await this.userService.create(body)
			await this.historyService.createHistory("create", user)

			return user
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserController createUser", error })
			throw new InternalServerErrorException()
		}
	}

	@Patch(":id")
	async updateUser(@Param("id") userId: number, @Body() body: UpdateUserDto): Promise<IUser> {
		try {
			const user = await this.userService.findById(userId)

			if (!user) {
				throw new HttpException(`Пользователя #${userId} не существует`, HttpStatus.NOT_FOUND)
			}

			const updatedUser = await this.userService.update(user, body)
			await this.historyService.createHistory("update", updatedUser)

			return updatedUser
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserController createUser", error })
			throw new InternalServerErrorException()
		}
	}

	@Patch("issues/reset")
	async resetIssues(): Promise<{ updatedUserCount: number }> {
		try {
			const updatedUserCount = await this.userService.resetIssues()

			return {
				updatedUserCount
			}
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserController resetIssues", error })
			throw new InternalServerErrorException()
		}
	}

	@Delete(":id")
	async deleteUser(@Param("id") userId: number): Promise<IUser> {
		try {
			const user = await this.userService.findById(userId)
			console.log(user)

			if (!user) {
				throw new HttpException(`Пользователя #${userId} не существует`, HttpStatus.NOT_FOUND)
			}

			return await this.userService.delete(userId)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserController deleteUser", error })
			throw new InternalServerErrorException()
		}
	}
}
