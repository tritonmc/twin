const axios = require("axios");
var config = {};

const getConfig = async (req, res) => {
  try {
    var id = Buffer.from(req.params.id, "base64").toString("ascii");
    var response = await axios.get("https://hastebin.com/raw/" + id);
    if (!(response.data instanceof Object) || !response.data.tritonv) {
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
    var response = await axios.post("https://hastebin.com/documents", req.body);
    res.end(Buffer.from(response.data.key + ".json", "ascii").toString("base64"));
  } catch (ex) {
    console.error(ex);
    res.sendStatus(500);
  }
};

module.exports = function(api, conf) {
  config = conf;
  api.get("/get/:id", getConfig);
  api.post("/upload", upload);
  api.post("/save", upload);
};
