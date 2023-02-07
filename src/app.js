import express from "express";
import cors from "cors";

import chalk from "chalk";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Bem vindo ao BoardCamp 16");
});

app.listen(5000, () => {
    console.log(chalk.white.bgGreenBright("SERVER INICIALIZADO!"));
})