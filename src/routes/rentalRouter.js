import { Router } from "express";
import { insertNewRental, listAllRentals } from "../controllers/rentalController.js";
import { verifyCustomerExists } from "../middleware/verifyCustomer.js";
import { verifyGameExists } from "../middleware/verifyGame.js";
import { verifyGameStock } from "../middleware/verifyGameStock.js";

const router = Router();

router.get("/rentals", listAllRentals);
router.post("/rentals", verifyCustomerExists, verifyGameExists, verifyGameStock, insertNewRental);

export default router;