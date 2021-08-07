import fs from "fs";
import cron from "node-cron";
import path from "path";
import { fileURLToPath } from "url";

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
    let changed = false;
    await Promise.all(
      Object.entries(fileCreateDates).map(async ([file, createdAt]) => {
        if (createdAt + fileExpiry < Date.now()) {
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
  });
};

if (fs.existsSync(filePath)) {
  fileCreateDates = JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
