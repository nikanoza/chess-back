import { model, Schema } from "mongoose";

const emailVerification = new Schema<VerifyEmailI>({
  hash: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
});

const EmailVerify = model("EmailVerify", emailVerification);

export default EmailVerify;
