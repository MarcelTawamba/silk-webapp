import { db } from "./db.js";
import { publicProcedure, router } from "./trpc.js";
import { z } from "zod";
import type { GroupedFinding, RawFinding } from "./types.js";

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

  findings: {
    getGroupedFindings: publicProcedure.query(async () => {
      return new Promise<GroupedFinding[]>((resolve, reject) => {
        db.all<GroupedFinding>("SELECT * FROM grouped_findings", (err, rows) => {
          if (err) {
            reject(new Error(`Failed to query grouped findings: ${err.message}`));
            return;
          }
          resolve(rows);
        });
      });
    }),
    getRawFindings: publicProcedure.query(async () => {
      return new Promise<RawFinding[]>((resolve, reject) => {
        db.all<RawFinding>("SELECT * FROM raw_findings", (err, rows) => {
          if (err) {
            reject(new Error(`Failed to query raw findings: ${err.message}`));
            return;
          }
          resolve(rows);
        });
      });
    }),
    getRawFindingsByGroupId: publicProcedure
    .input(z.object({ groupedFindingId: z.number() }))
    .query(async ({ input }) => {
      return new Promise<RawFinding[]>((resolve, reject) => {
        db.all<RawFinding>(
          "SELECT * FROM raw_findings WHERE grouped_finding_id = ?",
          [input.groupedFindingId],
          (err, rows) => {
            if (err) {
              reject(new Error(`Failed to query raw findings by group ID ${input.groupedFindingId}: ${err.message}`));
              return;
            }
            resolve(rows);
          }
        );
      });
    }),
  }
});
