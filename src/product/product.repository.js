import ProductModel from "./product.model.js";

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
  async getProducts() {
    try {
      return await ProductModel.find();
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const data = await ProductModel.findByIdAndDelete(id);
      return data.countDelete;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productData) {
    try {
      const updatedData = await ProductModel.findOneAndUpdate(
        { _id: productData.id },
        {
          quantity: updatedData.quantity,
        },
        { returnDocument: "after" }
      );
      return updatedData;
    } catch (error) {
      throw error;
    }
  }
}
