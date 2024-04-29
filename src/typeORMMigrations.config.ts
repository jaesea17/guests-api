// import { ConfigService } from '@nestjs/config';
import { DataSource } from "typeorm";
import { loadEnv } from "./loadEnv";

const configService = loadEnv();
export default new DataSource({
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  entities: ["**/*.entity{.ts,.js}"],
  migrations: ["../scripts/migrations/*.ts"],
});
