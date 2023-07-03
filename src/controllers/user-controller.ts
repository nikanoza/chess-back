import { Request, Response } from "express";
import { User } from "models";

export const getAllUser = async (_: Request, res: Response) => {
  const data = await User.find().select(
    "-_id -__v -anyOtherUnnecessaryProperty"
  );

  return res.status(200).json(data);
};
