import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "./api/user/user.module"
import { HistoryModule } from "./api/history/history.module"
import typeorm from './config/typeorm';

@Module({
	imports: [
		UserModule,
		HistoryModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [typeorm],
			envFilePath: [`envs/.${process.env.NODE_ENV || "local"}.env`],
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
