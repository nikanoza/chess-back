import { Request, Response } from "express";
import { User } from "models";
import { registerSchema } from "schemas";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, repeatPassword } = req.body;
    const value = await registerSchema.validateAsync({
      username,
      email,
      password,
      repeatPassword,
    });
    const user = new User(value);
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
