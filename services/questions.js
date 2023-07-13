// const { getAllProblems } = require("../utils/sphereEngine");

import {
  addProblem,
  deleteProblem,
  getAllProblems,
} from "../utils/sphereEngine.js";

export const getAllEditableProblems = async () => {
  const problems = await getAllProblems();

  if (!problems) {
    return false;
  }

  return problems.filter((pb) => pb.permissions.edit);
};

export const addProblemService = async (body) => {
  const response = await addProblem(body);

  if (!response) {
    return false;
  }

  return response;
};

export const deleteProblemService = async (id) => {
  const response = await deleteProblem(id);

  if (!response) {
    return false;
  }

  return response;
};
