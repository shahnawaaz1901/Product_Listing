import ProductRepository from "./product.repository";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getProducts(req, res, next) {
    try {
      const data = await this.productRepository.getProducts();
      res.status(200).json({ success: true, products: data });
    } catch (error) {
      next(error);
    }
  }
  async newProduct(req, res, next) {
    try {
      const { name, quantity } = req.body;
      if (!name) {
        throw new Error("Name Must be Present");
      }

      if (!quantity) {
        throw new Error("Quantity Must be Present");
      }
      const newProduct = await this.productRepository.newProduct({
        name,
        quantity,
      });
      return newProduct;
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const { id, quantity } = req.query;
      const updatedProduct = await this.productRepository.updateProduct({
        id,
        quantity,
      });
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deletedData = await this.productRepository.deleteProduct(id);
      if (deletedData) {
        res
          .status(200)
          .json({ success: true, message: "Product Deleted Successfully" });
      } else {
        res.status(404).json({ success: false, message: "Product Not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}
