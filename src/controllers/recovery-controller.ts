import { Request, Response } from "express";
import crypto from "crypto";
import { PasswordRecovery, User } from "models";
import { sendRecoveryMail } from "mail/edge";

export const sendRecoveryRequest = async (req: Request, res: Response) => {
  const { email, backLink } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "There is no user with this email" });
  }

  if (backLink) {
    const hash = crypto.randomBytes(48).toString("hex");
    await PasswordRecovery.create({
      email,
      hash,
    });

    await sendRecoveryMail(email, hash, user.username, backLink);
    return res.status(200).json({ message: "check your email!" });
  }

  return res
    .status(401)
    .json({ message: "please, provide correct credentials..." });
};
