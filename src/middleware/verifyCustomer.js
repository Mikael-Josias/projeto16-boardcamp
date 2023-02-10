import { db } from "../database/database.connection.js";

import chalk from "chalk";

export async function verifyCustomerExists(req, res, next) {
    try {
        const { customerId } = req.body;

        const customerExists = await db.query(`SELECT id FROM customers WHERE id = $1`, [customerId]);
        if (customerExists.rowCount === 0)  return res.sendStatus(400);

        next();
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
}