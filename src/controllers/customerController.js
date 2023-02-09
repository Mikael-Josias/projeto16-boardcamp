import { db } from "../database/database.connection.js";

import chalk from "chalk";

export async function listAllCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers`);
        res.send(customers.rows);
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
};