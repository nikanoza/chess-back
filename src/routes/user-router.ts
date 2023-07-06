import { getAllUser, login, register } from "controllers";
import express from "express";

const userRouter = express.Router();

userRouter.get("/users", getAllUser);
userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;
