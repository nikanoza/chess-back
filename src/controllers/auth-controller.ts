import { Request, Response } from "express";
import { sendEmailVerification } from "mail/edge";
import { EmailVerify, User } from "models";
import { registerSchema } from "schemas";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
      purchase: [],
      id,
    });
    await user.save();
    await EmailVerify.create({
      hash,
      email,
    });

    await sendEmailVerification(email, hash, username, value.redirectLink);
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
