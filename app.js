/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    autoIndex: true,
  })
  .then(() => {})
  .catch((e) => console.error(e));

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {});
