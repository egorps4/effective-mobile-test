import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"

export const getPostgresConfig = (): TypeOrmModuleAsyncOptions => ({
	useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
		return {
			type: "postgres",
			host: configService.get("POSTGRES_HOST") as string,
			port: +(configService.get("POSTGRES_PORT") as string),
			username: configService.get("POSTGRES_USERNAME") as string,
			password: configService.get("POSTGRES_PASSWORD") as string,
			database: configService.get("POSTGRES_DATABASE") as string,
			synchronize: true,
			autoLoadEntities: true,
			logging: false,
			dropSchema: false,
			entities: [],
			subscribers: [],
			migrations: [],
		}
	},
	imports: [ConfigModule],
	inject: [ConfigService],
})
