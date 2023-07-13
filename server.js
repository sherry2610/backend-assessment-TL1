const path = require("path");
const express = require("express");
const logger = require("morgan");

const connectDB = require("./connection/db");
const usersRouter = require("./routes/users");

// MongoDB Atlas connection
connectDB();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", usersRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
