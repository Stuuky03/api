import { z } from "zod";
require("dotenv").config();

const nodeEnv = z.enum(['development', 'production']);

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
  return (value: any) => {
    if (env === process.env.NODE_ENV && !value) {
      return false;
    }

    return true;
  }
}

const envSchema = z.object({
  NODE_ENV: nodeEnv.default('development'),
  PORT: z.string().min(1).transform((val) => Number(val)),
  HOST: z.string().min(1),
})

export const env = envSchema.parse(process.env);