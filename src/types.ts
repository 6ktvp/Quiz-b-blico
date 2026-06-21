export interface Question {
  id: string;
  theme: string;
  level: number; // 1 to 5
  levelName: string; // "Fácil", "Médio", "Difícil", etc.
  question: string;
  options: string[];
  correctAnswerIndex: number;
  citation: string; // e.g. "Gênesis 6:14"
}

export interface ScoreEntry {
  id?: string;
  name: string;
  score: number;
  levelReached: number;
  correctAnswers: number;
  date: string;
}

export type GamePhase = 'home' | 'playing' | 'levelup' | 'gameover' | 'victory';
