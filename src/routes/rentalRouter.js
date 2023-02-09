import { Router } from "express";
import { listAllRentals } from "../controllers/rentalController.js";

const router = Router();

router.get("/rentals", listAllRentals);

export default router;