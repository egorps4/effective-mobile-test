import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModel } from "./user.model"
import { HistoryModel } from "../history/history.model"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { CustomLogger } from "src/common/custom.logger"
import { HistoryModule } from "../history/history.module"
import { UserRepository } from "./user.repository"

@Module({
	controllers: [UserController],
	providers: [CustomLogger, UserService, UserRepository],
	imports: [TypeOrmModule.forFeature([UserModel, HistoryModel]), HistoryModule],
	exports: [UserService],
})
export class UserModule {}
