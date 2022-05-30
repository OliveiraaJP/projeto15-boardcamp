import { Router } from "express";
import { getCustomers, getSingleCustomer, registerCustomer } from "../controllers/customersController.js";
import customerValidation from "../middlewares/registerCustomerMiddleware.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', getSingleCustomer)
customersRouter.post('/customers', customerValidation, registerCustomer)

export default customersRouter;