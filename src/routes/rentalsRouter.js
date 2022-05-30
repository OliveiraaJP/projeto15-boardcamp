import { Router } from "express";
import { deleteRental, getAllRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getAllRentals);
rentalsRouter.post('/rentals');
rentalsRouter.post('/rentals/:id/return');
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;
