import "./dotenv.js";
import express from "express";
import productRouter from "./src/product/product.router.js";
const app = express();

app.get("/api/products", productRouter);
export default app;
