//* Packages
import express from "express";

//* Internal Modules
import "./dotenv.js";
import productRouter from "./src/product/product.router.js";
import errorResponse from "./src/error/error.response.js";

//* Initialize Server
const app = express();

//* for Populate req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Routers
app.use("/api/products", productRouter);

//* Error Reponse
app.use(errorResponse);

//* Default Response
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Resource Not found" });
});
export default app;
