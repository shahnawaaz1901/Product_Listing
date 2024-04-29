//* Internal Modules
import ProductRepository from "./product.repository.js";
import CustomError from "../error/error.class.js";
import mongoose, { MongooseError } from "mongoose";

//* Product Controller Class
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  //* Get the Products
  async getProducts(req, res, next) {
    try {
      const data = await this.productRepository.get();
      res.status(200).json({ success: true, products: data });
    } catch (error) {
      next(error);
    }
  }

  //* Get One Product
  async getOneProduct(req, res, next) {
    try {
      const { productId } = req.params;
      if (!productId) {
        throw new CustomError(406, "ProductId must be Present !!");
      }
      const data = await this.productRepository.getOne(productId);
      if (!data) {
        throw new CustomError(404, "Product not found !!");
      }
      res.status(200).json({ success: true, product: data });
    } catch (error) {
      next(error);
    }
  }

  //* Add new Product
  async newProduct(req, res, next) {
    try {
      const { name, quantity } = req.body;
      if (!name) {
        throw new CustomError(406, "Name Must be Present");
      }

      if (quantity == 0) {
        throw new CustomError(406, "Quantity Must greater then 0");
      }

      if (!quantity) {
        throw new CustomError(406, "Quantity Must be Present");
      }
      const newProduct = await this.productRepository.new({
        name,
        quantity,
      });
      return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      next(error);
    }
  }

  //* Update a Product
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.query;
      if (!id) {
        throw new CustomError(406, "ProductId must be Present");
      }

      if (!quantity) {
        throw new CustomError(406, "Quantity must be Present");
      }

      const updatedProduct = await this.productRepository.update({
        id,
        quantity,
      });
      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  //* Delete a Product
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new CustomError(406, "ProductId must be present");
      }
      const deletedData = await this.productRepository.delete(id);
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
