const axios = require("axios");
const db = require("../lib/db");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const encryptionSecret =
  process.env.SECRET || "7ff168d2726bbc85adc44b4fd68cacc02222fab6b85555bf62f4cabcb525e105";
var config = {};
var demoFile = {};

const getConfig = async (req, res) => {
  try {
    if (req.params.id === "demo") {
      res.json(demoFile);
      return;
    }
    var id = Buffer.from(req.params.id, "base64").toString("ascii");
    var response = await axios.get("https://bytebin.lucko.me/" + id);

    if (!(response.data instanceof Object) || !response.data.iv || !response.data.encryptedData) {
      res.sendStatus(404);
      return;
    }

    const iv = Buffer.from(response.data.iv, "hex");
    const encryptedText = Buffer.from(response.data.encryptedData, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(encryptionSecret, "hex"),
      iv
    );
    res.json(
      JSON.parse(Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString("utf8"))
    );
  } catch (ex) {
    //console.error(ex);
    res.sendStatus(404);
  }
};

const upload = async (req, res) => {
  try {
    if (!req.is("application/json")) return res.send(400);
    var body = req.body;
    var userId = body.user;
    if (body.origin == undefined) {
      try {
        body.user = await db.getTokenUser(req.token);
      } catch (e) {
        res.sendStatus(401);
        return;
      }
    }
    if (body.tritonv >= 3)
      fs.appendFile(
        path.resolve(__dirname, "../../access.log"),
        `${new Date().toISOString()}|${userId}|${body.resource}|${body.nonce}|${
          req.headers["x-forwarded-for"] || req.connection.remoteAddress
        }|${body.user}\n`,
        (err) => err && console.log(err)
      );

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(encryptionSecret, "hex"), iv);

    const bodyEncrypted = {
      iv: iv.toString("hex"),
      encryptedData: Buffer.concat([
        cipher.update(JSON.stringify(body), "utf8"),
        cipher.final(),
      ]).toString("hex"),
    };

    var response = await axios.post("https://bytebin.lucko.me/post", bodyEncrypted);
    var code = Buffer.from(response.data.key, "ascii").toString("base64");
    while (code.endsWith("=")) code = code.substring(0, code.length - 1);
    res.end(code);
  } catch (ex) {
    //console.error(ex);
    res.sendStatus(500);
  }
};

module.exports = function (api, conf) {
  config = conf;
  demoFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../assets/demo.json")));
  api.get("/get/:id", getConfig);
  api.post("/upload", upload);
  api.post("/save", upload);
};
