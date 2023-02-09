import { Router } from "express";
import { listAllCustomers } from "../controllers/customerController.js";

const router = Router();

router.get("/customers", listAllCustomers);

export default router;