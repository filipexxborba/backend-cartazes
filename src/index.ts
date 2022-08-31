import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Sales from "./routes/Sales";
import Products from "./routes/Products";
require("dotenv").config();

mongoose.connect(process.env.DB_URI!);
const database = mongoose.connection;

database.once("open", () =>
  console.log(
    "🐱‍👤 Conexão com o banco de dados MongoDB efetuada com sucesso!"
  )
);

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
server.use("/sales", Sales);
server.use("/products", Products);

server.listen(process.env.PORT || 3000, () =>
  console.log(
    `Servidor iniciado e rodando na porta: ${process.env.PORT || 3000}`
  )
);
