import mongoose from "mongoose";
import ProductModel from "./product.model.js";
import CustomError from "../error/error.class.js";

export default class ProductRepository {
  async newProduct(newProduct) {
    try {
      const data = new ProductModel(newProduct);
      await data.save();
      return data;
    } catch (error) {
      throw error;
    }
  }
  async get() {
    try {
      return await ProductModel.find({});
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const data = await ProductModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(productData) {
    try {
      const updatedData = await ProductModel.findOneAndUpdate(
        { _id: productData.id },
        {
          quantity: productData.quantity,
        },
        { returnDocument: "after" }
      );
      if (!updatedData) {
        throw new CustomError(404, "Product Not found");
      }
      return updatedData;
    } catch (error) {
      throw error;
    }
  }
}
