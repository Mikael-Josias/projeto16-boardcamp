import { Router } from "express";
import { getCustomerById, insertNewCustomer, listAllCustomers, updateCustomerData } from "../controllers/customerController.js";

const router = Router();

router.get("/customers", listAllCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", insertNewCustomer);
router.put("/customers/:id", updateCustomerData);

export default router;