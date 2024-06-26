import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getPostgresConfig } from "./configs/pg";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`envs/.${process.env.NODE_ENV || "local"}.env`],
    }),
    TypeOrmModule.forRootAsync(getPostgresConfig())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
