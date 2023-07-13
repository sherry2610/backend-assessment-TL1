import dotenv from "dotenv";
dotenv.config();

import { fetchApi } from "./fetchWrapper.js";
import { SPHERE_ENGINE_BASE_URL } from "./constants.js";

export const getAllProblems = async () => {
  const { payload, status } = await fetchApi(
    `${SPHERE_ENGINE_BASE_URL}problems?access_token=${process.env.PROBLEMS_API_TOKEN}&limit=100`
  );
  console.log("payload.items", status);
  return status === 200
    ? payload.items.length > 0
      ? payload.items
      : []
    : false;
};

export const addProblem = async (body) => {
  const { payload, status } = await fetchApi(
    `${SPHERE_ENGINE_BASE_URL}problems?access_token=${process.env.PROBLEMS_API_TOKEN}`,
    body,
    "post"
  );
  console.log("payload.items", payload, status);
  return status === 201 ? payload : false;
};

export const deleteProblem = async (id) => {
  const { payload, status } = await fetchApi(
    `${SPHERE_ENGINE_BASE_URL}problems/${id}?access_token=${process.env.PROBLEMS_API_TOKEN}`,
    "",
    "delete"
  );
  console.log("payload.items", payload, status);
  return status === 200
    ? { message: `Question having ID : ${id} has been deleted successfully!` }
    : false;
};
