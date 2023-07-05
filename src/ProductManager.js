import fs from "fs/promises";

export default class ProductManager {
  id = 0;
  constructor() {
    this.products = [];
    this.path = "./products.json";
    this.loadData();
  }

  async loadData() {
    try {
      const json = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(json);
      if (this.products.length < 0) {
        this.id = 0;
      } else {
        this.id = this.products[this.products.length - 1].id + 1;
      }
    } catch {
      console.log(`el archivo ${this.path}no existe, creando...`);
      await fs.writeFile(this.path, "[]");
      return [];
    }
  }

  getProducts = async () => {
    return this.products;
  };

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    const itsValid = this.products.some(
      (productFind) => productFind.code === code
    );
    if (itsValid) {
      console.log(`ERROR: Code in use in ${product.title}`);
      return;
    }

    const productn = new Product(product);

    this.products.push({
      id: this.id++,
      ...productn,
    });

    const newProduct = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProduct);

    return `producto ${title} ingresado correctamente`;
  }

  async getProductById(id) {
    const getProduct = this.products.find((prod) => prod.id === id);
    if (getProduct) {
      return getProduct;
    }
    return "Producto Not found";
  }
  async updateProduct(id, product) {
    const { title, description, price, thumbnail, code, stock } = product;

    const itsValid = this.products.some((productFind) => productFind.id === id);
    if (itsValid) {
      console.log(`ERROR: ID in use in ${product.title}`);
      return;
    }

    let update = this.products.map((p) => {
      if (p.id === id) {
        return { ...p, ...product };
      }
      return p;
    });
    await fs.writeFile(this.path, JSON.stringify(update));
  }

  async deleteProduct(id) {
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
  constructor(product) {
    const { title, description, price, thumbnail, code, stock } = product;
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

// await productManager.addProduct({
//   title: "cuchara",
//   description: "cuchara dorado",
//   price: "6200",
//   thumbnail: "url",
//   code: "n04",
//   stock: "15",
// });

// await productManager.addProduct({
//   title: "tenedor",
//   description: "tenedo   dorado",
//   price: "620",
//   thumbnail: "url",
//   code: "n05",
//   stock: "17",
// });

// await productManager.addProduct({
//   title: "cuchillo",
//   description: "cuchillo dorado",
//   price: "62000",
//   thumbnail: "url",
//   code: "n08",
//   stock: "25",
// });

//03. Ver todos los productos agregados
// console.log(await productManager.getProducts());

//04. Consultar producto segun ID
// console.log(await productManager.getProductById(4));

//05. Cambiar producto
productManager.updateProduct(1, {
  title: "taza",
  description: "taza dorado",
  price: "5980",
  thumbnail: "url",
  code: "n12",
  stock: "250",
});

//06. Eliminar Producto
// console.log(await productManager.deleteProduct(0));
