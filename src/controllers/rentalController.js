import { db } from "../database/database.connection.js";

import chalk from "chalk";

export async function listAllRentals(req, res) {
    try {
        const rentals = await db.query(`SELECT * FROM rentals;`);
        for (const rental of rentals.rows) {
            const customer = await db.query(`SELECT id, name FROM customers WHERE id = $1;`, [rental.customerId]);
            const game = await db.query(`SELECT id, name FROM customers WHERE id = $1;`, [rental.gameId]);

            rental.customers = customer.rows[0];
            rental.game = game.rows[0];
        }
        
        res.send(rentals.rows);
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
};