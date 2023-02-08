import { db } from "../database/database.connection.js";
import chalk from "chalk";

export async function listGames(_, res) {
    try {
        const games = await db.query(`SELECT * FROM games`);
        res.send(games.rows);
    } catch (error) {
        console.log(chalk.bgRedBright.white(error));
        res.sendStatus(500);
    }
}