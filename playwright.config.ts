import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run start:test",
    url: "http://localhost:3000",
    // Never reuse a server started with `npm run dev`: it loads .env.local,
    // so the reset endpoint would truncate the development database.
    reuseExistingServer: false,
  },
})
