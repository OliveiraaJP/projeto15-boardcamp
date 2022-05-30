import { Router } from "express";
import { getCustomers, getSingleCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', getSingleCustomer)

export default customersRouter;