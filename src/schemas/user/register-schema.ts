import Joi from "joi";
import { User } from "models";

const registerSchema = Joi.object({
  username: Joi.string()
    .required()
    .external(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Username already exists");
      }
    }),
  email: Joi.string()
    .email()
    .required()
    .external(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
    }),
  password: Joi.string().min(8).max(15).required(),
  repeatPassword: Joi.ref("password"),
  redirectLink: Joi.string().uri().required(),
});

export default registerSchema;
