import { Module, forwardRef } from "@nestjs/common"
import { HistoryController } from "./history.controller"
import { CustomLogger } from "src/common/custom.logger"
import { HistoryService } from "./history.service"
import { HistoryRepository } from "./history.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModel } from "../user/user.model"
import { HistoryModel } from "./history.model"
import { UserModule } from "../user/user.module"

@Module({
	controllers: [HistoryController],
	providers: [CustomLogger, HistoryService, HistoryRepository],
	imports: [TypeOrmModule.forFeature([UserModel, HistoryModel]), forwardRef(() => UserModule)],
	exports: [HistoryService, HistoryRepository],
})
export class HistoryModule {}
