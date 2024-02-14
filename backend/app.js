const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const candyRoute = require("./routes/candy");

const mysql = require("mysql2");

const database = require("./database/db");

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());

app.use(candyRoute);


database
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("server has started at port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
