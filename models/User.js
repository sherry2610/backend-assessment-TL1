import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

export default mongoose.model("User", UserSchema);
