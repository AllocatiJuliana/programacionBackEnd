import { log } from "console";
import fs from "fs/promises";

class ProductManager {
  id = 0;
  constructor() {
    this.products = [];
    this.path = "./products.json";
  }

  async readFile() {
    const json = await fs.readFile(this.path, "utf8");
    return json;
  }

  getProducts = async () => {
    const json = await this.readFile();
    this.products = JSON.parse(json);
    return this.products;
  };

  async addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );

    this.products.push({
      id: this.id++,
      ...newProduct,
    });
    const newProducto = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProducto);
  }

  async getProductById(id) {
    const json = await this.readFile();
    this.products = JSON.parse(json);
    const getProduct = this.products.find((prod) => prod.id === id);
    if (getProduct) {
      return getProduct;
    }
    return "Producto Not found";
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const json = await this.readFile();
    this.products = JSON.parse(json);

    const index = this.products.findIndex((producto) => producto.id === id);

    const productUpdate = {
      id: this.products[index].id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products[index] = productUpdate;
    const newProducto = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProducto);
  }
  async deleteProduct(id) {
    const json = await this.readFile();
    this.products = JSON.parse(json);

    const index = this.products.findIndex((producto) => producto.id === id);
    if (index < 0) {
      return "Producto Not found";
    }

    this.products.splice(index, 1);
    const newProducto = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProducto);
    return "Producto Eliminado Exitosamente";
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
const productManager = new ProductManager();

//1. Esto es para agregar productos.
//2. Genera el id sin repetirse.

// productManager.addProduct(
//   "cuchara",
//   "cuchara dorado",
//   "6200",
//   "url",
//   "n04",
//   "15"
// );

// productManager.addProduct(
//   "tenedor",
//   "tenedo   dorado",
//   "620",
//   "url",
//   "n05",
//   "17"
// );

//03. Ver todos los productos agregados
// console.log(await productManager.getProducts());

//04. Consultar producto segun ID
// console.log(await productManager.getProductById(4));

//05. Cambiar producto
// productManager.updateProduct(
//   1,
//   "cuchillo",
//   "cuchillo dorado",
//   "3000",
//   "url",
//   "n06",
//   "20"
// );

//06. Eliminar Producto
// console.log(await productManager.deleteProduct(0));
