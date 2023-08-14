
//Import Module
import express from "express";
import chalk from 'chalk';
const app = express();
const PORT = 3000

app.get("/", (req, res, next) => {
    res.send("Hi, the express app is working")
})
app.listen(PORT, () => console.log(chalk.blue('app listenig at Port: '), chalk.magenta(PORT) ));