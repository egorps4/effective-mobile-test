import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	Param,
	Patch,
	Post,
	Query,
	Req,
	Res,
} from "@nestjs/common"
import { Request, Response } from "express"
import { UserService } from "../user/user.service"
import { CustomLogger } from "src/common/custom.logger"
import { IHistory } from "src/interfaces/history.interface"
import { GetHistoryByUserIdDto } from "./dto/getHistoryByUserId.dto"
import { HistoryService } from "./history.service"

@Controller("history")
export class HistoryController {
	constructor(
		private readonly loggerService: CustomLogger,
		private readonly userService: UserService,
		private readonly historyService: HistoryService
	) {}

	@Get("")
	async findUserHistory(@Query() query: GetHistoryByUserIdDto): Promise<IHistory[]> {
		try {
			const user = this.userService.findById(query.userId)

			if (!user) {
				throw new HttpException(`Пользователя #${query.userId} не существует`, HttpStatus.NOT_FOUND)
			}

			return await this.historyService.findByUserId(query)
		} catch (error) {
			if (error instanceof HttpException) throw error
			this.loggerService.log({ mode: "error", ctx: "HistoryController findUserHistory", error })
			throw new InternalServerErrorException()
		}
	}
}
