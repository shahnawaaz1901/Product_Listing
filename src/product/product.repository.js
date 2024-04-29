//* Packages
import mongoose from "mongoose";

//* Internal Modules
import ProductModel from "./product.model.js";
import CustomError from "../error/error.class.js";

//* Product Repository Class
export default class ProductRepository {
  //* Add new Product to Database
  async new(newProduct) {
    try {
      const data = new ProductModel(newProduct); //* Create Instance
      await data.save(); //* Save on Database
      return data;
    } catch (error) {
      throw error; //* Pass Error to Product Controller Catch
    }
  }

  //* Get a Product From Database
  async get() {
    try {
      return await ProductModel.find({}); //* Return the Products
    } catch (error) {
      throw error;
    }
  }

  //* Delete a Product From Database
  async delete(id) {
    try {
      //* Delete a Product and Saved Return Value to data
      const data = await ProductModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      return data;
    } catch (error) {
      /* 
        When a User Enters the Incorrect id then Database thrown Error that id 
        must be haxadecimal format so Error of that type is BSON Error that's 
        why we check for BSON Error 
      */
      if (error instanceof mongoose.mongo.BSON.BSONError) {
        throw new CustomError(406, error.message);
      }
      throw error;
    }
  }

  //* Update a Product on Database
  async update(productData) {
    try {
      /*
        Use findOneAndUpdate so that updated Document is returned from Database
      */
      const updatedData = await ProductModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productData.id) },
        {
          quantity: productData.quantity,
        },
        { returnDocument: "after" }
      );

      //* If product Not found then throw Error
      if (!updatedData) {
        throw new CustomError(404, "Product Not found");
      }
      return updatedData;
    } catch (error) {
      if (error instanceof mongoose.mongo.BSON.BSONError) {
        throw new CustomError(406, error.message);
      }
      throw error;
    }
  }

  //* Get a Single Product By Id from Database
  async getOne(id) {
    try {
      return await ProductModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
      });
    } catch (error) {
      if (error instanceof mongoose.mongo.BSON.BSONError) {
        throw new CustomError(406, error.message);
      }
      throw error;
    }
  }
}
