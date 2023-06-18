class ProductManager {
  constructor() {
    this.product = [];
  }

  getProducts = () => {
    return this.product;
  };

  addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    const findProductDuplicado = this.product.filter(
      (prod) => prod.code === newProduct.code
    );
    if (findProductDuplicado.length > 0) {
      console.log("El codigo del producto ya existe ");
      return;
    }
    this.product.push(newProduct);
  }

  getProductById(id) {
    const getProduct = this.product.find((prod) => prod.id === id);
    if (getProduct) {
      return getProduct;
    }
    console.log("Producto Not found");
  }
}

class Product {
  static id = 1;
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = Product.id++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
const product = new ProductManager();
product.addProduct(
  "Bowl",
  "Bowl con Hojas Azules",
  4620,
  "https://res.cloudinary.com/dlsk3cazy/image/upload/v1680901836/1_iu21qp.jpg",
  "b01",
  5
);
product.addProduct(
  "Cuchara",
  "Cuchara Dorada con Punta en Forma de Hojas",
  2200,
  "https://res.cloudinary.com/dlsk3cazy/image/upload/v1680901837/2_uz8jnn.jpg",
  "b02",
  8
);
product.addProduct(
  "Frasco",
  "Frasco con Flores Naranjas",
  8690,
  "https://res.cloudinary.com/dlsk3cazy/image/upload/v1680901836/3_sa54a9.jpg",
  "b02",
  3
);

console.log("Todos los Productos");
console.log(product.getProducts());
console.log("Buscando Producto 100");
product.getProductById(100);
