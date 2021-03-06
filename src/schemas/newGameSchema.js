import joi from "joi";

const newGameSchema = joi.object({
  name: joi.string().min(1).max(50).required(),
  image: joi.string().min(1).required(),
  stockTotal: joi.number().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().min(1).required()
});

export default newGameSchema;