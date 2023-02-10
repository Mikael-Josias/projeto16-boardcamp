import { db } from "../database/database.connection.js";

import chalk from "chalk";

export async function verifyGameStock(req, res, next) {
    try {
        const { gameId  } = req.body;

        const stockData = await db.query(
            `SELECT games."stockTotal", COUNT(rentals."gameId") AS rented FROM games JOIN rentals ON games.id = rentals."gameId" WHERE games.id = $1 GROUP BY games."stockTotal";`,
            [gameId]);
        
        if (stockData.rows.length !== 0) {
            if (Number(stockData.rows[0].rented) >= Number(stockData.rows[0].stockTotal)) return res.sendStatus(400);
        }

        next();
        
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
};