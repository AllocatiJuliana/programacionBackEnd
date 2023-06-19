class ProductManager {
  id = 0;
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    const findProductDuplicado = this.products.filter(
      (prod) => prod.code === code
    );
    if (findProductDuplicado.length > 0) {
      console.log("El codigo del producto ya existe ");
      return;
    }

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
  }

  getProductById(id) {
    const getProduct = this.products.find((prod) => prod.id === id);
    if (getProduct) {
      return getProduct;
    }
    console.log("Producto Not found");
  }
}

class Product {
  //static id = 1;
  constructor(title, description, price, thumbnail, code, stock) {
    //this.id = Product.id++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
const productManager = new ProductManager();
productManager.addProduct({
  title: "Bowl",
  description: "Bowl con Hojas Azules",
  price: 4620,
  thumbnail:
    "https://res.cloudinary.com/dlsk3cazy/image/upload/v1680901836/1_iu21qp.jpg",
  code: "b01",
  stock: 5,
});
productManager.addProduct({
  title: "Cuchara",
  description: "Cuchara Dorada con Punta en Forma de Hojas",
  price: 2200,
  thumbnail:
    "https://res.cloudinary.com/dlsk3cazy/image/upload/v1680901837/2_uz8jnn.jpg",
  code: "b02",
  stock: 8,
});
productManager.addProduct({
  title: "Frasco",
  description: "Frasco con Flores Naranjas",
  price: 8690,
  thumbnail:
    "https://res.cloudinary.com/dlsk3cazy/image/upload/v1680901836/3_sa54a9.jpg",
  code: "b02",
  stock: 3,
});

console.log("Todos los Productos");
console.log(productManager.getProducts());
console.log("Buscando Producto 100");
productManager.getProductById(100);
