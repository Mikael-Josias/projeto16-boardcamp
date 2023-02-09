import { Router } from "express";
import { insertNewGame, listGames } from "../controllers/gameController.js";

const router = Router();

router.get("/games", listGames);
router.post("/games", insertNewGame);

export default router;