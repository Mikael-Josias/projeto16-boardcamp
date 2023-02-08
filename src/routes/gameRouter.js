import { Router } from "express";
import { listGames } from "../controllers/gameController.js";

const router = Router();

router.get("/games", listGames);

export default router;