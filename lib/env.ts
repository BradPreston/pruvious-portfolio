import { z } from "zod";

import tryParseEnv from "./TryParseEnv";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),
  PRUVIOUS_SECRET_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

export default EnvSchema.parse(process.env);
