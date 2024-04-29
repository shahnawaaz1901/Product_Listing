import CustomError from "./error.class.js";
const errorResponse = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res
      .status(err.responseCode)
      .json({ success: false, message: err.message });
  }
  res.status(500).json({ success: false, message: "Internal Server Error" });
};

export default errorResponse;
