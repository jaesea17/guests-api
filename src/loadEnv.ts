import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

export function loadEnv() {
  const envFilePath = `${process.cwd()}/conf/${
    process.env.NODE_ENV ?? 'dev'
  }.env`;
  dotenv.config({ path: envFilePath });
  return new ConfigService();
}
