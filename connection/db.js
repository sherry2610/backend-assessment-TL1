require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.CLUSTER_URL}/${process.env.DATABASE}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));
};

module.exports = connectDB;
