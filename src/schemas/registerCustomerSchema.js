import joi from "joi";

const registerCustomerSchema = joi.object({
  name: joi.string().min(1).required(),
  cpf: joi.string()
    .min(11)
    .max(11)
    .pattern(/^[0-9]{11}$/)
    .required(),
  phone: joi.string()
    .pattern(/^([0-9]{10})([0-9]{1})?$/)
    .required(),
  birthday: joi.string().isoDate().required(),
});

export default registerCustomerSchema;
