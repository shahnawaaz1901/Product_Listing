import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    mongoose.connect(`${process.env.DB_URL}/ProductListing`);
    console.log("Database is Connected via Mongoose");
  } catch (error) {
    console.log("Error While Connecting to Database !!");
  }
};

export default connectToDB;
