import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "mysql",
  dbCredentials: {
    url: "mysql://root:1234@localhost:3306/guyz_maker_portfolio",
  },
});
