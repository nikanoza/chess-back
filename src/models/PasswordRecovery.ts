import { model, Schema } from "mongoose";

const passwordRecoverySchema = new Schema<PasswordRecoveryI>({
  hash: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
});

const PasswordRecovery = model("PasswordRecovery", passwordRecoverySchema);

export default PasswordRecovery;
