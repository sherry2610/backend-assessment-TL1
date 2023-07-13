import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuestionSchema = Schema({
  question_id: Number,
  question_code: String,
  createdBy: String,
});

export default mongoose.model("Question", QuestionSchema);
