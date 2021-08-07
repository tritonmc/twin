import express from "express";
import expressBearerToken from "express-bearer-token";
import config from "../config.js";
import api from "./api.js";
import { startScheduler } from "./storage.js";

const app = express();

app.disable("x-powered-by");

app.use(express.json({ limit: "50mb" }));
app.use(
  expressBearerToken({
    bodyKey: "access_token",
    queryKey: "access_token",
    headerKey: "Triton",
    reqKey: "token",
  })
);

const apiRoute = express.Router();
api.setupRoutes(apiRoute, config);

app.use("/api/v1", apiRoute);

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening on port " + port);

startScheduler(config?.fileExpiry ?? 24 * 60 * 60 * 1000);
