import Joi from "joi";

const registerCustomerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  cpf: Joi.string()
    .min(11)
    .max(11)
    .pattern(/^[0-9]{11}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^([0-9]{10})([0-9]{1})?$/)
    .required(),
  birthday: Joi.string().isoDate().required(),
});

export default registerCustomerSchema;
