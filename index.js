import "./dotenv.js";
import express from "express";
import productRouter from "./src/product/product.router.js";
import CustomError from "./src/error/error.class.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRouter);
app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res
      .status(err.responseCode)
      .json({ success: false, message: err.message });
  }
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Resource Not found" });
});
export default app;
