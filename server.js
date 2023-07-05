import express from "express";
import ProductManager from "./manejoDeArchivos";

const app = express();

const manager = new ProductManager("./products.json");

app.get("/productos", async (req, res) => {
  const productos = await manager.getProducts();

  res.send(productos);
});

app.get("/producto/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await manager.getProducts();

  res.send(productos);
});

app.listen(8080, () => {
  console.log(" conectados ");
});
