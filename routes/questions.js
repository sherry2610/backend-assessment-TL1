import express from "express";
import bodyParser from "body-parser";
import FormData from "form-data";
import isAdmin from "../middlewares/autentication.js";
import {
  addProblemService,
  deleteProblemService,
  getAllEditableProblems,
} from "../services/questions.js";
import Question from "../models/Question.js";

// const { getAllEditableProblems } = require("../services/questions");

const questionsRouter = express.Router();
questionsRouter.use(bodyParser.json());

// Admin APIs
questionsRouter.get("/questions", isAdmin, async (req, res) => {
  // Retrieve questions from the database
  // Example implementation
  const questions = await getAllEditableProblems();
  if (!questions) {
    res.status(403).json({ message: "Unable to access questions list" });
  } else {
    // console.log("res.locals.email", res.locals.email);
    res.status(200).json({ questions });
  }
});

questionsRouter.post("/questions", isAdmin, async (req, res) => {
  // Add a new question to the database

  const { name, masterjudgeId } = req.body;
  console.log("{ name, masterjudgeId }", name, masterjudgeId);
  if (!name) {
    res.status(400).json({ error: "name not provided" });
  } else if (!masterjudgeId) {
    res.status(400).json({ error: "Master judge not provided" });
  }
  let formdata = new FormData();
  formdata.append("name", name);
  formdata.append("masterjudgeId", masterjudgeId);

  const response = await addProblemService(formdata);

  if (!response) {
    res.status(403).json({ message: "Unable to create a question" });
  } else {
    const { id, code } = response;
    const quest = new Question({ question_id: id, question_code: code });
    await quest.save();
    res.status(201).json({ response });
  }
});

questionsRouter.put("/questions/:id", isAdmin, (req, res) => {
  // Update a question in the database
  // Example implementation
  const questionId = req.params.id;
  res.json({ message: `Question ${questionId} updated successfully (admin)` });
});

questionsRouter.delete("/questions/:id", isAdmin, async (req, res) => {
  // Delete a question from the database
  // Example implementation
  const questionId = req.params.id;

  if (!questionId) {
    res.status(400).json({ error: "id is not provided in params" });
  } else {
    const response = await deleteProblemService(questionId);
    if (!response) {
      res.status(400).json({ error: "error in deleting from sphere engine" });
    } else {
      const quest = await Question.findOneAndDelete({
        question_id: questionId,
      });
      quest.save();
      res.json({ message: response });
    }
  }
});

export default questionsRouter;
