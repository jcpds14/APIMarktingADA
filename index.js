// initial settings
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

// read json / middlewares (recursos a serem executados entre as requisições e respostas)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// api routes
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

// routes / endpoint
app.get("/", (req, res) => {
  // show req
  res.json({ message: "Oi Express" });
});

// port
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apiclusterada.otwbjsn.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
