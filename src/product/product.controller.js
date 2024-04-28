import ProductRepository from "./product.repository.js";
import CustomError from "../error/error.class.js";
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getProducts(req, res, next) {
    try {
      const data = await this.productRepository.get();
      res.status(200).json({ success: true, products: data });
    } catch (error) {
      next(error);
    }
  }
  async newProduct(req, res, next) {
    try {
      const { name, quantity } = req.body;
      console.log(name, quantity);
      if (!name) {
        throw new CustomError(206, "Name Must be Present");
      }

      if (!quantity) {
        throw new CustomError(206, "Quantity Must be Present");
      }
      const newProduct = await this.productRepository.newProduct({
        name,
        quantity,
      });
      return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.query;
      const updatedProduct = await this.productRepository.update({
        id,
        quantity,
      });
      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.params);
      const deletedData = await this.productRepository.deleteProduct(id);
      if (deletedData && deletedData.deletedCount) {
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
