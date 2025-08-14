/* eslint-disable prettier/prettier */
// src/config/validation.ts
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url({ message: 'DATABASE_URL must be a valid URL' }),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

// Function to validate and transform env variables
export const validateEnv = (config: Record<string, unknown>) => {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    console.error('Invalid environment variables ❌ :', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration.');
  }

  return parsed.data;
};
