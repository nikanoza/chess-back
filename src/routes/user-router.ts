import { getAllUser, register } from "controllers";
import express from "express";

const userRouter = express.Router();

userRouter.get("/users", getAllUser);
userRouter.post("/register", register);

export default userRouter;
