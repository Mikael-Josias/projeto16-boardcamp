import { db } from "../database/database.connection.js";
import { gameSchema } from "../schemas/gameSchema.js";

import chalk from "chalk";

export async function listGames(_, res) {
    try {
        const games = await db.query(`SELECT * FROM games`);
        res.send(games.rows);
    } catch (error) {
        console.log(chalk.bgRedBright.white(error));
        res.sendStatus(500);
    }
};

export async function insertNewGame(req, res) {
    try {
        const data = {
            name: req.body.name,
            image: req.body.image,
            stockTotal: Number(req.body.stockTotal),
            pricePerDay: Number(req.body.pricePerDay),
        };
        if (gameSchema.validate(data).error) return res.sendStatus(400);

        const gameAlreadExist = await db.query(`SELECT * FROM games WHERE name = $1`, [data.name]);
        if (gameAlreadExist.rowCount !== 0) return res.sendStatus(409);

        const result = await db.query(
            `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,
            [data.name, data.image, data.stockTotal, data.pricePerDay]);
        
        result.rowCount === 1 ? res.sendStatus(201) : res.sendStatus(400);
    } catch (error) {
        console.log(chalk.bgRedBright.white(error));
        res.sendStatus(500);
    }
};