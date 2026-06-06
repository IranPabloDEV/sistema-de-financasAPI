require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");

const gastoRoutes = require("./routes/gastoRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use(gastoRoutes);

app.use(
  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec),
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
  })
  .catch((erro) => {
    console.log("❌ Erro ao conectar:", erro);
  });

app.get("/", (req, res) => {
  res.send("API Controle Financeiro funcionando!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
