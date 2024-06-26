import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { CustomLogger } from "src/common/custom.logger"
import { ActionsType, IHistory } from "src/interfaces/history.interface"
import { GetHistoryByUserIdDto } from "./dto/getHistoryByUserId.dto"
import { HistoryRepository } from "./history.repository"
import { IUser } from "src/interfaces/user.interface"
import { UserEntity } from "../user/user.entity"
import { HistoryEntity } from "./history.entity"

@Injectable()
export class HistoryService {
	constructor(
		private readonly historyRepository: HistoryRepository,
		private readonly loggerService: CustomLogger
	) {}

	public async findByUserId(filter: GetHistoryByUserIdDto): Promise<IHistory[]> {
		try {
			return await this.historyRepository.findByUserId(filter)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "HistoryService findAll", error })
			throw new InternalServerErrorException()
		}
	}

	public async createHistory(actionType: ActionsType, user: IUser): Promise<IHistory> {
		try {
			const userEntity = new UserEntity(user)
			const historyEntity = new HistoryEntity({actionType, user: userEntity})
			return await this.historyRepository.create(historyEntity)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "HistoryService createHistory", error })
			throw new InternalServerErrorException()
		}
	}
}
