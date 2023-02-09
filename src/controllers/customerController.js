import { db } from "../database/database.connection.js";
import { customerSchema } from "../schemas/customerSchema.js";

import chalk from "chalk";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

export async function listAllCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`);
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

export async function insertNewCustomer(req, res) {
    try {
        const data = {
            name: req.body.name,
            phone: req.body.phone,
            cpf: req.body.cpf,
            birthday: dayjs(req.body.birthday, "YYYY-MM-DD").toDate(),
        };
        if (customerSchema.validate(data).error) return res.sendStatus(400);

        const customerAlreadyExists = await db.query(`SELECT cpf FROM customers WHERE cpf = $1;`, [data.cpf]);
        if (customerAlreadyExists.rowCount !== 0) return res.sendStatus(409);

        const result = await db.query(
            `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
            [data.name, data.phone, data.cpf, data.birthday]);
        result.rowCount === 1 ? res.sendStatus(201) : res.sendStatus(400);
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
};

export async function updateCustomerData(req, res) {
    try {
        const customerId = req.params.id;
        const data = {
            name: req.body.name,
            phone: req.body.phone,
            cpf: req.body.cpf,
            birthday: dayjs(req.body.birthday, "YYYY-MM-DD").toDate(),
        };
        if (customerSchema.validate(data).error) return res.sendStatus(400);

        const cpfAlreadyUsed = await db.query(
            `SELECT cpf FROM customers WHERE id <> $1 AND cpf = $2;`,
            [customerId, data.cpf]);
        if (cpfAlreadyUsed.rowCount !== 0) return res.sendStatus(409);

        const result = await db.query(
            `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`,
            [data.name, data.phone, data.cpf, data.birthday, customerId]);
        result.rowCount === 1 ? res.sendStatus(200) : res.sendStatus(400);
    } catch (error) {
        console.log(chalk.redBright.white(error));
        res.sendStatus(500);
    }
};