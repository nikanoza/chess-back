import Joi from "joi";

const passwordRecoverySchema = Joi.object({
  password: Joi.string().min(8).max(15).required(),
  repeatPassword: Joi.ref("password"),
  hash: Joi.string().required(),
});

export default passwordRecoverySchema;