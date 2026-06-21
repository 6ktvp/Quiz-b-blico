import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { ScoreEntry } from './types';

// Web App Firebase parameters
const firebaseConfig = {
  apiKey: "AIzaSyCc190MZpCwiBohTLZq_AtXxqby0Y-LcSQ",
  authDomain: "pacific-bricolage-107pf.firebaseapp.com",
  projectId: "pacific-bricolage-107pf",
  storageBucket: "pacific-bricolage-107pf.firebasestorage.app",
  messagingSenderId: "973687163694",
  appId: "1:973687163694:web:2f7e57138f21edfef488bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore targeting the specific database provisioned for this applet
export const db = getFirestore(app, "ai-studio-0a778f36-9ac0-4f21-81d2-f559d43819a5");

// Local Storage highscore helper for fallback
const LOCAL_SCORE_KEY = 'quiz_biblico_local_scores';

function getLocalHighscores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_SCORE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local highscores', e);
    return [];
  }
}

function saveLocalHighscore(entry: ScoreEntry) {
  try {
    const current = getLocalHighscores();
    current.push(entry);
    // Sort descending by score
    current.sort((a, b) => b.score - a.score);
    // Limit to 20
    const limited = current.slice(0, 20);
    localStorage.setItem(LOCAL_SCORE_KEY, JSON.stringify(limited));
  } catch (e) {
    console.error('Error saving local highscore', e);
  }
}

/**
 * Saves a highscore. Attempts Firestore first, falls back to localStorage.
 */
export async function saveScore(name: string, score: number, levelReached: number, correctAnswers: number): Promise<boolean> {
  const scoreEntry: ScoreEntry = {
    name: name.trim() || 'Jogador Anônimo',
    score,
    levelReached,
    correctAnswers,
    date: new Date().toLocaleDateString('pt-BR'),
  };

  // Always save locally so the player sees it immediately in fallback scenarios
  saveLocalHighscore(scoreEntry);

  try {
    const colRef = collection(db, 'highscores');
    await addDoc(colRef, {
      ...scoreEntry,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (e) {
    console.warn('Firestore write failed, using local fallback only:', e);
    return false;
  }
}

/**
 * Fetches top highscores. Combines Firestore query and localStorage fallback.
 */
export async function getTopScores(): Promise<ScoreEntry[]> {
  try {
    const colRef = collection(db, 'highscores');
    const q = query(colRef, orderBy('score', 'desc'), limit(15));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // If Firestore is empty but connected, return local scores or empty
      const local = getLocalHighscores();
      if (local.length > 0) return local;
      return [];
    }

    const fetched: ScoreEntry[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      fetched.push({
        id: doc.id,
        name: data.name || 'Jogador Anônimo',
        score: data.score || 0,
        levelReached: data.levelReached || 1,
        correctAnswers: data.correctAnswers || 0,
        date: data.date || 'Recente',
      });
    });

    return fetched;
  } catch (e) {
    console.warn('Firestore fetch failed, serving offline local scores:', e);
    // Fallback to local storage sorting
    const local = getLocalHighscores();
    local.sort((a, b) => b.score - a.score);
    return local.slice(0, 15);
  }
}
