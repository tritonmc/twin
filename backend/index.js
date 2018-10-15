const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

app.disable("x-powered-by");
//app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../frontend/build"), { extensions: ["html"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-bearer-token")());
//app.use(require("./redirect.js"));

// Setup config
const config = require("./api/config.auto.js");

var api = express.Router();

fs.readdir("./api/modules/", (err, files) => {
  files.forEach((file) => {
    if (!config.disabledModules.includes(file)) {
      var apiModule = require("./api/modules/" + file);
      apiModule(api, config);
    }
  });

  app.use("/api/v1", api);

  //require("./views.js")(app, config);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
  var port = process.env.PORT || 5000;
  app.listen(port);
  console.log("Listening on port " + port);
});
