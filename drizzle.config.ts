import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
    schema: "./src/server/db/schema.ts",
    driver: "mysql2",
    dbCredentials: {
        connectionString: env.DATABASE_URL,
    },
    tablesFilter: ["portfolio-2023_*"],
    out: "src/server/db/migrations",
} satisfies Config;
