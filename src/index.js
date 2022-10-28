// dotenv
require("dotenv").config();
// config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.xzqvi4z.mongodb.net/bancodaapi?retryWrites=true&w=majority`;

// forma de ler JSON / midlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// rotas da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// rota inicial / endpoint
app.get("/", (req, res) => {});

// entregar uma porta
mongoose
  .connect(url)
  .then(() => {
    console.log("Conectado ao MongoDB!");
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log("Erro ao conectar ao MongoDB");
    console.log(error);
  });
