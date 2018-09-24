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

module.exports = function(api, conf) {
  config = conf;
  api.get("/get/:id", getConfig);
};
