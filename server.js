//* Internal Modules
import app from "./index.js";
import connectToDB from "./config/mongoose.js";

const PORT = process.env.PORT || 3000;

//* Listening the Port
app.listen(PORT, (e) => {
  if (e) {
    console.log(e);
    return;
  }
  console.log(`Server is Up on Port : ${PORT} `);
  connectToDB();
});
