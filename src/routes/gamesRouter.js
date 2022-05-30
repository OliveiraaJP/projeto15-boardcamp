import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import newGameValidation from "../middlewares/newGameValidation.js";


const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', newGameValidation, postGames);

export default gamesRouter;