require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT;
const URL_INFURA = process.env.URL_INFURA;

app.get("/ping", async (req, res) => {
  res.send({ fecha: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
