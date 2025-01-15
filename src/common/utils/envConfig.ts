import dotenv from "dotenv";
import { cleanEnv, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly("development"),
    choices: ["development", "production", "test"],
  }),
  PORT: port({ devDefault: testOnly(8080) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  DATABASE_URL: str({ devDefault: testOnly("") }),
  JWT_SECRET: str({ devDefault: testOnly("abcd") }),
  JWT_EXPIRY: num({ devDefault: testOnly(86400) }),
  HASH_SALT_ROUNDS: num({ devDefault: testOnly(10) }),
});
