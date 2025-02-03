/*******************************************************/
/*   This is the default config for Triton's Backend   */
/*  Please copy this file and rename it to config.js   */
/*         Then edit the config as you please.         */
/*******************************************************/

export default {
  // Disable database (and auth) when testing
  disableDatabase: true,
  database: "postgresql:///triton?host=/run/postgresql",
  fileExpiry: 24 * 60 * 60 * 1000, // 24h
  disabledModules: [],
};
