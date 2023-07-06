import Joi from "joi";
import { User } from "models";

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .custom(async (value, helpers) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        return value;
      } catch (err) {
        return helpers.error("any.invalid");
      }
    }),
  password: Joi.string().required(),
});

export default loginSchema;
