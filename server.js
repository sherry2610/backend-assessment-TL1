import path from "path";
import express from "express";
import logger from "morgan";

import connectDB from "./connection/db.js";
import usersRouter from "./routes/users.js";
import questionsRouter from "./routes/questions.js";

// MongoDB Atlas connection
connectDB();

const app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", usersRouter);
app.use("/admin", questionsRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
