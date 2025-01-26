import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const DB = `mongodb+srv://abcd:nIe7hqxE6bDxECcT@cluster0.vsmu4.mongodb.net/MovieNest?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
