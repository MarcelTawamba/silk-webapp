import * as path from "node:path";
import sqlite3 from "sqlite3";

/**
 * Opens a connection to the findings database
 */
function connectToDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      path.join(import.meta.dirname, "./findings.db"),
      sqlite3.OPEN_READONLY,
      (err) => {
        if (err) {
          reject(new Error(`Failed to open database: ${err.message}`));
          return;
        }
      },
    );

    resolve(db);
  });
}

export const db = await connectToDatabase();
