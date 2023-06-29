import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./config/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";

import { userRouter } from "routes";

dotenv.config();
connectToMongo();

const server = express();

server.use(bodyParser.json());
server.use("/api", cors(), userRouter);

server.listen(process.env.PORT || 4000);
