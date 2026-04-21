const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
    .connect('mongodb://127.0.0.1:27017/wtwr_db')
    .then(() => {
        // console.log("Connected to the Database");
    })
    .catch((e) => console.error(e));

app.use(express.json());

app.use((req, res, next) => {
    req.user = {
        _id: '69e7f6bfccd30e3742447349'
    };
    next();
});

app.use('/', mainRouter);

app.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`);
});