import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const requiredEnvVars = ['PORT', 'MEALDB_BASE_URL'] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is not defined`);
  }
}

export const env = {
  port: process.env.PORT,
  mealdbBaseUrl: process.env.MEALDB_BASE_URL,
} as const;
