import { Router } from "express";
import { getCustomerById, insertNewCustomer, listAllCustomers } from "../controllers/customerController.js";

const router = Router();

router.get("/customers", listAllCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", insertNewCustomer);

export default router;