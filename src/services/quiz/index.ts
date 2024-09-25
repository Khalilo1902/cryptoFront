import axios from "axios";
import { SERVER_URL } from "..";

//GET Random Quiz
export const getRandomQuestions = () => {
  const url = `${SERVER_URL}/quiz/random-question`;
  return axios.get(url);
};
