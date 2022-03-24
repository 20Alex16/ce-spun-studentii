import { Question } from "./question";

export enum PointsMode {
  Single = 1,
  Double = 2,
  Triple = 3,
}

export interface DBTeam {
  name: string;
  points: number;
}

export interface DBAnswer {
  text: string;
  revealed: boolean;
  points: number;
}

export interface DBQuestion {
  id: number;
  text: string;
  answers: DBAnswer[];
  revealed: boolean;
}

export interface DB {
  currentQuestion: number;
  pointsMultiplier: PointsMode;
  questions: DBQuestion[];
  flashQuestions: DBQuestion[];
  team1: DBTeam;
  team2: DBTeam;
  flashRoundTeam: 1 | 2;
  flash: {
    answers1: {answer: string, points: number}[];
    answers2: {answer: string, points: number}[];
  }
}