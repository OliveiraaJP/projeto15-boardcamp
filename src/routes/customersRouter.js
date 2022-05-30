import { Router } from "express";
import {
  editCustomer,
  getCustomers,
  getSingleCustomer,
  registerCustomer,
} from "../controllers/customersController.js";
import customerValidation from "../middlewares/registerCustomerMiddleware.js";
import updateValidation from "../middlewares/updateCustomerMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getSingleCustomer);
customersRouter.post("/customers", customerValidation, registerCustomer);
customersRouter.put("/customers/:id", updateValidation, editCustomer);

export default customersRouter;
