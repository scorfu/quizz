export interface QuestionInfo {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[]; //incorrect_answers: Array<string>
    questionIndex?: number;
  }

export interface Response {
    response_code: number;
    results?: Array<QuestionInfo>;
  }
