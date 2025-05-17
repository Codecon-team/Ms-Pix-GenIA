import { z } from "zod";
import dotenv from "dotenv";
import { logger } from "../logger/logger";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  logger.error("Invalid environment variables", _env.error.format());
  process.exit(1); 
}

export const env = _env.data;
