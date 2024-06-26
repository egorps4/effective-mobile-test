import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { UserRepository } from "./user.repository"
import { CustomLogger } from "src/common/custom.logger"
import { CreateUserDto } from "./dto/create.dto"
import { UpdateUserDto } from "./dto/update.dto"
import { UserEntity } from "./user.entity"
import { IUser } from "src/interfaces/user.interface"

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly loggerService: CustomLogger
	) {}

	public async findAll() {
		try {
			return await this.userRepository.findAll()
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserService findAll", error })
			throw new InternalServerErrorException()
		}
	}

	public async findById(userId: number) {
		try {
			return await this.userRepository.findById(userId)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserService findById", error })
			throw new InternalServerErrorException()
		}
	}

	public async create(dto: CreateUserDto) {
		try {
			const userEntity = new UserEntity(dto)
			return await this.userRepository.create(userEntity)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserService create", error })
			throw new InternalServerErrorException()
		}
	}

	public async update(user: IUser, dto: UpdateUserDto) {
		try {
			const userEntity = new UserEntity({...user, ...dto})
			return await this.userRepository.update(userEntity)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserService update", error })
			throw new InternalServerErrorException()
		}
	}

	public async resetIssues() {
		try {
			return await this.userRepository.updateIssues(false)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserService update", error })
			throw new InternalServerErrorException()
		}
	}

	public async delete(userId: number) {
		try {
			const user = await this.findById(userId)
			const userEntity = new UserEntity(user)
			userEntity.delete()

			return await this.userRepository.delete(userEntity)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserService update", error })
			throw new InternalServerErrorException()
		}
	}
}
