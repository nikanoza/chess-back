import { Request, Response } from "express";
import { sendEmailVerification } from "mail/edge";
import { EmailVerify, User } from "models";
import { loginSchema, registerSchema } from "schemas";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, repeatPassword, redirectLink } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const hash = crypto.randomBytes(48).toString("hex");
    const value = await registerSchema.validateAsync({
      username,
      email,
      password,
      repeatPassword,
      redirectLink,
    });

    const id = uuid();

    const user = new User({
      username: value.username,
      email: value.email,
      password: hashedPassword,
      verify: false,
      purchase: [],
      id,
    });
    await user.save();
    await EmailVerify.create({
      hash,
      email,
    });

    await sendEmailVerification(email, hash, username, value.redirectLink);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const verifyAccount = async(req: Request, res: Response) => {
  try {
    const { hash } = req.body;
    const verifyDocument = await EmailVerify.findOne({hash});
    if(!verifyDocument){
      return res.status(400).json({ message: "incorrect credentials" });
    }

    const user = await User.findOne({ email: verifyDocument.email})

    if(!user){
      return res.status(400).json({ message: "user not exist" });
    }
    user.verify = true;
    await user.save();
    await verifyDocument.deleteOne();
    return res.status(200).json({message: "account verify"})
  } catch (error) {
    return res.status(400).send(error);
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await loginSchema.validateAsync({
      email,
      password,
    });
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "user not found!" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const signData = {
        username: user.username,
        email: user.email,
        address: user.address,
        purchase: user.purchase,
        userId: user.id,
      };

      const token = jwt.sign(signData, process.env.JWT_SECRET!);
      return res.status(200).json({ ...signData, token });
    }

    return res
      .status(401)
      .json({ message: "please, provide correct credentials..." });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "please, provide correct credentials..." });
  }
};
