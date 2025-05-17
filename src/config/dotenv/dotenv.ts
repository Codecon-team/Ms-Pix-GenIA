import { z } from 'zod'

const envScheme = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3001),
  MERCADOPAGO_ACCESS_TOKEN: z.string(),
  MERCADOPAGO_PUBLIC_KEY: z.string(),
  MERCADOPAGO_CLIENT_ID: z.string(),
  MERCADOPAGO_CLIENT_SECRET: z.string(),
})

export const env = envScheme.parse(process.env)
