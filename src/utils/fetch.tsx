import axios from "axios";
import type { Response } from "./types";

export async function fetchQuestions(): Promise<Response> {
  const response = await axios
    .get<Response>("https://opentdb.com/api.php?amount=10");
  return response.data;
}
