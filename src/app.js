import express from "express";
import cors from "cors";

import chalk from "chalk";

import gameRouter from "./routes/gameRouter.js";
import customerRouter from "./routes/customerRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(gameRouter);
app.use(customerRouter);

app.listen(5000, () => {
    console.log(chalk.white.bgGreenBright("SERVER INICIALIZADO!"));
});