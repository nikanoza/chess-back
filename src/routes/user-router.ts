import { getAllUser } from "controllers";
import express from "express";

const userRouter = express.Router();

userRouter.get("/users", getAllUser);

export default userRouter;
