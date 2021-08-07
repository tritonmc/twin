import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import database from "./database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "../upload");

let config = {};
let staticConfigs = {};

const getConfig = async (req, res) => {
  try {
    const { id } = req.params;

    // If there is a static config with this ID, return it (e.g. 'demo', 'empty', etc)
    if (staticConfigs[id]) return res.json(staticConfigs[id]);

    // Prevent against path injection
    if (!/^[a-zA-Z0-9]+$/.test(id)) return res.sendStatus(400);

    const content = await fs.promises.readFile(path.join(UPLOAD_DIR, id), "utf-8");

    res.json(JSON.parse(content));
  } catch (ignore) {
    res.sendStatus(404);
  }
};

const upload = async (req, res) => {
  try {
    if (!req.is("application/json")) return res.send(400);

    const body = req.body;

    // The payload from the TWIN webapp includes an 'origin' field with the path of the accessed config
    // If the payload has that field, it means it's saving changed so we skip authentication
    if (!config.disableDatabase && !body.origin) {
      try {
        body.username = await database.getTokenUser(req.token);
      } catch (e) {
        return res.sendStatus(401);
      }
    }

    const id = randomBytes(6).toString("hex");
    await fs.promises.writeFile(path.join(UPLOAD_DIR, id), JSON.stringify(body), "utf-8");

    res.end(id);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(500);
  }
};

const loadStaticConfigs = () => {
  const staticConfigs = {};

  const directory = path.resolve(__dirname, "../assets/static-configs");
  fs.readdirSync(directory).forEach((fileName) => {
    if (!fileName.endsWith(".json")) return;

    staticConfigs[fileName.replace(".json", "")] = JSON.parse(
      fs.readFileSync(path.join(directory, fileName), "utf-8")
    );
  });

  return staticConfigs;
};

export const setupRoutes = (route, conf) => {
  config = conf;
  staticConfigs = loadStaticConfigs();

  route.get("/get/:id", getConfig);
  route.post("/upload", upload);
  route.post("/save", upload);
};

export default { setupRoutes };
