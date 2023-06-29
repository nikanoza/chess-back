import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./config/mongo.js";

dotenv.config();
connectToMongo();

const server = express();

server.listen(process.env.PORT || 4000);
