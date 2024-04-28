import app from "./index.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, (e) => {
  if (e) {
    console.log(e);
    return;
  }
  console.log(`Server is Up on Port : ${PORT} `);
});
