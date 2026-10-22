import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  FRONTEND_ORIGIN: z.string().url().transform((origin) => new URL(origin).origin).default("http://127.0.0.1:5173"),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z
    .string()
    .min(32)
    .refine((secret) => !/replace-with|change-me|your-secret/i.test(secret), "Replace the example JWT secret.")
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  const invalidKeys = result.error.issues.map((issue) => issue.path.join("."));
  throw new Error(`Invalid backend environment configuration: ${invalidKeys.join(", ")}`);
}

export const config = Object.freeze({
  nodeEnv: result.data.NODE_ENV,
  port: result.data.PORT,
  frontendOrigin: result.data.FRONTEND_ORIGIN,
  mongoUri: result.data.MONGODB_URI,
  jwtSecret: result.data.JWT_SECRET,
  isProduction: result.data.NODE_ENV === "production"
});
