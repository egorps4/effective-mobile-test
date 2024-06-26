import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, UpdateResult } from "typeorm"
import { CustomLogger } from "src/common/custom.logger"
import { IHistory } from "src/interfaces/history.interface"
import { HistoryModel } from "./history.model"
import { GetHistoryByUserIdDto } from "./dto/getHistoryByUserId.dto"
import { IUser } from "src/interfaces/user.interface"

@Injectable()
export class HistoryRepository {
	constructor(
		@InjectRepository(HistoryModel) private historyModel: Repository<HistoryModel>,
		private readonly loggerService: CustomLogger
	) {}

	async findByUserId(filter: GetHistoryByUserIdDto): Promise<IHistory[]> {
		try {
			const { userId, page, offset } = filter

			if (page === null && offset === null) {
				return await this.historyModel.find({
					where: { user: { id: userId } },
					relations: ["user"],
				})
			}

			const currentPage = page ?? 1
			const currentOffset = offset ?? 50

			const skip = (currentPage - 1) * currentOffset

			return await this.historyModel.find({
				where: { user: { id: userId } },
				relations: ["user"],
				skip,
				take: currentOffset,
			})
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "HistoryRepository findByUserId", error })
			throw new InternalServerErrorException()
		}
	}

	async create(model: IHistory): Promise<IHistory> {
		try {
			return await this.historyModel.save(model)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "UserRepository create", error })
			throw new InternalServerErrorException()
		}
	}
}
