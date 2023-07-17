import { getAllUser, login, register, verifyAccount } from "controllers";
import express from "express";

const userRouter = express.Router();

userRouter.get("/users", getAllUser);
userRouter.post("/register", register);
userRouter.post("/verify", verifyAccount);
userRouter.post("/login", login);

export default userRouter;
