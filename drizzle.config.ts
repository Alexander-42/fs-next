import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

// In a test environment only .env.test is used. Otherwise .env.local wins when
// present, with .env.test as a fallback so CI (which only writes .env.test and
// does not set NODE_ENV) still finds a connection string.
// dotenv never overrides an already-set variable, so earlier paths take priority.
const envFiles =
  process.env.NODE_ENV === "test" ? [".env.test"] : [".env.local", ".env.test"]
dotenv.config({ path: envFiles })

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})