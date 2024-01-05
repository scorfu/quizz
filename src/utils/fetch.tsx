import axios from "axios";
import type { ResponseQuestions, ResponseLeaderboard } from "./types";

// export async function fetchQuestions(): Promise<Response> {
//   const response = await axios.get<Response>(
//     "https://opentdb.com/api.php?amount=10"
//   );
//   return response.data;
// }

// export async function fetchLeaderboard(): Promise<Response> {
//   const response = await axios.get<Response>(
//     "https://quizz-2866f-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json"
//   );
//   return response.data;
// }

export async function fetchData(
  type: string,
  options?: object,
  url?: string
): Promise<ResponseQuestions | ResponseLeaderboard | any> {
  if (type === "questions") {
    const response = await axios.get<ResponseQuestions>(
      "https://opentdb.com/api.php?amount=10"
    );
    return response.data;
  }

  switch (type) {
    case "get":
      try {
        const response = await axios.get<ResponseLeaderboard>(
          "https://quizz-2866f-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json"
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
      break;
    case "post": {
      const { player, score }: { player: string; score: number } =
        options as any;
      try {
        const response = await axios.post<ResponseLeaderboard>(
          "https://quizz-2866f-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json",
          {
            player,
            score,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
}
