import { Router } from "express";
import { getCustomerById, listAllCustomers } from "../controllers/customerController.js";

const router = Router();

router.get("/customers", listAllCustomers);
router.get("/customers/:id", getCustomerById);

export default router;