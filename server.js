import express from "express";
import ProductManager from "./src/ProductManager.js";

const app = express();
const manager = new ProductManager();

app.get("/productos", async (req, res) => {
  const { limit } = req.query;
  const productos = await manager.getProducts();
  if (limit) {
    res.send(productos.splice(0, +limit));
  } else {
    res.send(productos);
  }
});

app.get("/producto/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await manager.getProductById(+id);
  res.send(productos);
});

app.listen(8080, () => {
  console.log(" conectados ");
});
