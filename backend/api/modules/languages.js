const axios = require("axios");
const db = require("../lib/db");
const fs = require("fs");
const path = require("path");
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
    if (!(response.data instanceof Object)) {
      res.sendStatus(404);
      return;
    }
    res.json(response.data);
  } catch (ex) {
    console.error(ex);
    res.sendStatus(404);
  }
};

const upload = async (req, res) => {
  try {
    if (!req.is("application/json")) return res.send(400);
    var body = req.body;
    if (body.origin == undefined) {
      try {
        body.user = await db.getTokenUser(req.token);
      } catch (e) {
        res.sendStatus(401);
        return;
      }
    }
    var response = await axios.post("https://bytebin.lucko.me/post", body);
    var code = Buffer.from(response.data.key, "ascii").toString("base64");
    while (code.endsWith("=")) code = code.substring(0, code.length - 1);
    res.end(code);
  } catch (ex) {
    console.error(ex);
    res.sendStatus(500);
  }
};

module.exports = function(api, conf) {
  config = conf;
  demoFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../assets/demo.json")));
  api.get("/get/:id", getConfig);
  api.post("/upload", upload);
  api.post("/save", upload);
};
