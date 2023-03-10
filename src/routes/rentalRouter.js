import { Router } from "express";
import { deleteRental, insertNewRental, listAllRentals, returnRentedGame } from "../controllers/rentalController.js";
import { verifyCustomerExists } from "../middleware/verifyCustomer.js";
import { verifyGameExists } from "../middleware/verifyGame.js";
import { verifyGameStock } from "../middleware/verifyGameStock.js";

const router = Router();

router.get("/rentals", listAllRentals);
router.post("/rentals", verifyCustomerExists, verifyGameExists, verifyGameStock, insertNewRental);
router.post("/rentals/:id/return", returnRentedGame);
router.delete("/rentals/:id", deleteRental);

export default router;