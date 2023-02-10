import { db } from "../database/database.connection.js";

import chalk from "chalk";

export async function verifyGameExists(req, res, next) {
    try {
        const gameId = Number(req.body.gameId);
        if (Number.isNaN(gameId)) return res.sendStatus(400);

        const gameExists = await db.query(`SELECT "pricePerDay", "stockTotal" FROM games WHERE id = $1`, [gameId]);
        if (gameExists.rowCount === 0) return res.sendStatus(400);

        next();
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(error);
    }
}