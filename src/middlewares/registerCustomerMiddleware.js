import db from "../db.js";
import registerCustomerSchema from "../schemas/registerCustomerSchema.js";

export default async function customerValidation(req, res, next) {
  const { cpf } = req.body;

  const validation = registerCustomerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map((detail) => detail.message));
  }
  try {
    const customer = await db.query(
      `
      SELECT * FROM customers WHERE cpf = $1
    `,
      [cpf]
    );
    if (customer.rows[0]) {
      return res.status(409).send('Usuário já cadastrado');
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
