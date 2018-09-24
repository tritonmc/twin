var config = require("./config.def.js");
try {
  var customConf = require("./config.js");
  Object.assign(config, customConf);
} catch (ignore) {
  console.warn(
    "Failed to read api/config.js! Please make sure the file exists. Using default settings..."
  );
}

module.exports = config;
