import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { HistoryModel } from "src/api/history/history.model";
import { UserModel } from "src/api/user/user.model";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: `envs/.${process.env.NODE_ENV || 'local'}.env` });

const config = {
    type: 'postgres',
    host: `${process.env.POSTGRES_HOST}`,
    port: +`${process.env.POSTGRES_PORT}`,
    username: `${process.env.POSTGRES_USERNAME}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DATABASE}`,
    entities: ["dist/**/*.model{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);