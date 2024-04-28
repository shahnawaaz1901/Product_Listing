import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/Productlist`);
    console.log("Database is Connected via Mongoose");
  } catch (error) {
    console.log("Error While Connecting to Database !!");
  }
};

export default connectToDB;
