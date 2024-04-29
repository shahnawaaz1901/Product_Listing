import "./dotenv.js";
import express from "express";
import productRouter from "./src/product/product.router.js";
import errorResponse from "./src/error/error.response.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRouter);
app.use(errorResponse);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Resource Not found" });
});
export default app;
