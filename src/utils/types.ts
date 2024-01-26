export interface QuestionInfo {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
  questionIndex?: number;
}

export interface ResponseQuestions {
  response_code: number;
  results?: Array<QuestionInfo>;
}

export interface ResponseLeaderboard {
  [key: string]: {
    user: string;
    leaderboardScore: number;
  };
}

