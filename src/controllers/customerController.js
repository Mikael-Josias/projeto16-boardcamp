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

export async function getCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        customer.rowCount === 0 ? res.sendStatus(404) : res.send(customer.rows);
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
};