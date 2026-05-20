/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

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

app.use(requestLogger);
// check routes for import and exports
// app.use(routes);
app.use("/", router);

app.use(errorLogger);

// Check errorhandler imports and exports
// app.use(errors());
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.send({ message: err.message });
// });

app.listen(PORT, () => {});
