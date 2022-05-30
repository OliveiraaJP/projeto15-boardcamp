import db from "../db.js"
import registerCustomerSchema from "../schemas/registerCustomerSchema.js"

export default async function updateValidation(req, res, next) {
    const { id } = req.params;
    const { cpf } = req.body;
  
    const validation = registerCustomerSchema.validate(req.body, {
      abortEarly: true,
    });
  
    if (validation.error) {
      return res
        .status(400)
        .send(validation.error.details.map((detail) => detail.message));
    }
    try {
      const customer = await db.query(
        `
        SELECT * FROM customers WHERE cpf = $1 AND id != $2
      `,
        [cpf, id]
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