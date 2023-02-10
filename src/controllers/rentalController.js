import { db } from "../database/database.connection.js";

import chalk from "chalk";
import { insertRentalSchema } from "../schemas/rentalSchema.js";
import dayjs from "dayjs";

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

export async function insertNewRental(req, res) {
    try {
        const { error, value } = insertRentalSchema.validate({
            customerId: Number(req.body.customerId),
            gameId: Number(req.body.gameId),
            daysRented: Number(req.body.daysRented),
        });
        if (error) return res.sendStatus(400);
        
        const data = {
            ...value,
            rentDate: dayjs().toDate(),
            returnDate: null,
            delayFee: null,
        };
        
        const result = await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $4 * (select "pricePerDay" from games where id = $2), $6);`,
            [data.customerId, data.gameId, data.rentDate, data.daysRented, data.returnDate, data.delayFee]);
        result.rowCount !== 0 ? res.sendStatus(201) : res.sendStatus(400);
    } catch (err) {
        console.log(chalk.redBright.white(err));
        res.sendStatus(500);
    }
};

export async function returnRentedGame(req, res) {
    try {
        const rentalId = req.params.id;

        const rentalData = await db.query(
            `SELECT "daysRented", "rentDate", "originalPrice", "returnDate" FROM rentals WHERE id = $1`,
            [rentalId]);
        if (rentalData.rowCount === 0) return res.sendStatus(404);
        if (rentalData.rows[0].returnDate) return res.sendStatus(400);
        
        const today = dayjs().toDate();
        const rentalReturnGameDate = rentalData.rows[0].rentDate;
        rentalReturnGameDate.setDate(rentalData.rows[0].rentDate.getDate() + rentalData.rows[0].daysRented);
        
        let delayFee = 0;
        if (today > rentalReturnGameDate) {
            const diff = dayjs(today).diff(dayjs(rentalReturnGameDate), 'day');
            delayFee = (rentalData.rows[0].originalPrice / rentalData.rows[0].daysRented) * diff;
        }

        const result = await db.query(
            `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`,
            [today, delayFee, rentalId]);
        result.rowCount !== 0 ? res.sendStatus(201) : res.sendStatus(400);
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
};