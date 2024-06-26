import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { UserModel } from "./user.model"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, UpdateResult } from "typeorm"
import { IUser } from "src/interfaces/user.interface"
import { CustomLogger } from "src/common/custom.logger"

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(UserModel) private userModel: Repository<UserModel>,
		private readonly loggerService: CustomLogger
	) {}

	async findAll(): Promise<IUser[]> {
		try {
			return await this.userModel.find({ where: { deletedAt: null } })
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserRepository findAll", error })
			throw new InternalServerErrorException()
		}
	}

	async findById(id: number): Promise<IUser> {
		try {
			return await this.userModel.findOne({ where: { id, deletedAt: null } })
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserRepository findById", error })
			throw new InternalServerErrorException()
		}
	}

	async create(model: IUser): Promise<IUser> {
		try {
			return await this.userModel.save(model)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserRepository create", error })
			throw new InternalServerErrorException()
		}
	}

	async update(model: IUser): Promise<IUser> {
		try {
			const updatedInfo = await this.userModel.update({ id: model.id, deletedAt: null }, model)
			if (updatedInfo.affected === 0) {
				this.loggerService.log({ mode: "warn", message: "Не было обновлено ни одной строки", ctx: "UserRepository update" })
			}

			return await this.userModel.findOne({ where: { id: model.id, deletedAt: null } })
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserRepository update", error })
			throw new InternalServerErrorException()
		}
	}

	async updateIssues(status: boolean): Promise<number> {
		try {
			const updatedInfo = await this.userModel.update({ issues: !status, deletedAt: null }, { issues: status });
			if (updatedInfo.affected === 0) {
				this.loggerService.log({ mode: "warn", message: "Не было обновлено ни одной строки", ctx: "UserRepository resetIssues" })
			}

			return updatedInfo.affected
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserRepository resetIssues", error })
			throw new InternalServerErrorException()
		}
	}

	async delete(model: IUser): Promise<IUser> {
		try {
			const updatedInfo = await this.userModel.update({ id: model.id }, model)
			if (updatedInfo.affected === 0) {
				this.loggerService.log({ mode: "warn", message: "Пользователь не удален", ctx: "UserRepository updatedInfo" })
			}

			return await this.userModel.findOne({ where: { id: model.id } })
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserRepository delete", error })
			throw new InternalServerErrorException()
		}
	}
}
