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
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((e) => console.error(e));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833c8d133",
  };

  next();
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
