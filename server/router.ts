import { db } from "./db.js";
import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
  utils: {
    getServerTime: publicProcedure.query(() => {
      return { time: new Date() };
    }),
    getDbTables: publicProcedure.query(async () => {
      return new Promise<string[]>((resolve, reject) => {
        db.all<{ name: string }>(
          "SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%'",
          (err, data) => {
            if (err) {
              reject(new Error(`Failed to query database: ${err.message}`));
              return;
            }

            resolve(data.map((item) => item.name));
          },
        );
      });
    }),
  },
});
