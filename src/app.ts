import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./config/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";

import { recoveryRouter, userRouter } from "routes";
import { swagger } from "middlewares";

dotenv.config();
connectToMongo();

const server = express();

server.use(bodyParser.json());

server.use("/images", express.static("public/storage"));

server.use("/api", cors(), userRouter);
server.use("/api", cors(), recoveryRouter);
server.use("/", ...swagger());

server.listen(process.env.PORT || 4000);
