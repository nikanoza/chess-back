import { Request, Response } from "express";
import crypto from "crypto";
import { PasswordRecovery, User } from "models";
import { sendRecoveryMail } from "mail/edge";
import { passwordRecoverySchema } from "schemas";
import bcrypt from "bcrypt"

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

export const passwordReset = async (req: Request, res:Response) => {
  try {
    const { password, repeatPassword, hash } =
      req.body;
    await passwordRecoverySchema.validateAsync({
      password,
      repeatPassword,
      hash
    })
    const verifyDocument = await PasswordRecovery.findOne({hash});

    if(!verifyDocument){
      return res
      .status(401)
      .json({ message: "can't update password, something went wrong" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email: verifyDocument.email}, { password: hashedPassword});
    await verifyDocument.deleteOne()
    return res.status(200).json({message: "password update successfully"})

  } catch (error) {
    return res
      .status(401)
      .json({ message: "can't update password, something went wrong" });
  }
}