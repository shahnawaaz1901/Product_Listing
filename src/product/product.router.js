import express from "express";
import ProductController from "./product.controller.js";

const productRouter = express.Router();
const productController = new ProductController();

/*
  Instead of Pass ProductController member function we call the function because
  if we pass the function then value of "this" keyword will be null in the class
*/

//* Get Product Router
productRouter.get("/", (req, res, next) => {
  productController.getProducts(req, res, next);
});

//* Get One Product Router
productRouter.get("/getOne/:productId", (req, res, next) => {
  productController.getOneProduct(req, res, next);
});

//* Create Product Router
productRouter.post("/create", (req, res, next) => {
  productController.newProduct(req, res, next);
});

//* Update Product Router
productRouter.put("/:id/update_quantity/", (req, res, next) => {
  productController.updateProduct(req, res, next);
});

//* Delete Product Router
productRouter.delete("/:id", (req, res, next) => {
  productController.deleteProduct(req, res, next);
});

export default productRouter;
