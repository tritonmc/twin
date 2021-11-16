import fs from "fs";
import cron from "node-cron";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOAD_DIR = path.join(__dirname, "../upload");

const filePath = path.resolve(__dirname, "../upload/database.json");
let fileCreateDates = {};

export const addFile = async (id) => {
  fileCreateDates[id] = Date.now();
  await fs.promises.writeFile(filePath, JSON.stringify(fileCreateDates), "utf-8");
};

export const startScheduler = (fileExpiry) => {
  cron.schedule("* * * * *", async () => {
    try {
      logger.debug("Running storage cleaning task");
      let changed = false;
      await Promise.all(
        Object.entries(fileCreateDates).map(async ([file, createdAt]) => {
          if (createdAt + fileExpiry < Date.now()) {
            logger.info({ file }, "Deleting file because it has expired");
            const targetPath = path.join(UPLOAD_DIR, file);
            if (
              // if file exists
              await fs.promises.access(targetPath, fs.constants.F_OK).then(
                () => true,
                () => false
              )
            )
              await fs.promises.unlink(path.join(UPLOAD_DIR, file));
            delete fileCreateDates[file];
            changed = true;
          }
        })
      );

      if (changed) await fs.promises.writeFile(filePath, JSON.stringify(fileCreateDates), "utf-8");
    } catch (e) {
      logger.error(e, "Failed to run upload storage cleaning task");
    }
  });
  logger.info(`Scheduled storage cleaning task for uploads. Interval is ${fileExpiry / 1000}s`);
};

if (fs.existsSync(filePath)) {
  fileCreateDates = JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
