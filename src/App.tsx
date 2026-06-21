/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  Volume2, 
  VolumeX, 
  Music, 
  Heart, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  Play, 
  Sparkles, 
  User, 
  Clock, 
  Crown, 
  ShieldCheck,
  Compass,
  CornerDownRight,
  RefreshCcw,
  BookOpenText,
  HelpCircle
} from 'lucide-react';
import { audioEngine } from './audio';
import { QUESTIONS_POOL } from './questions';
import { saveScore, getTopScores } from './firebase';
import { Question, ScoreEntry, GamePhase } from './types';

export default function App() {
  // Game state
  const [nickname, setNickname] = useState<string>(() => {
    return localStorage.getItem('quiz_biblico_nickname') || '';
  });
  const [phase, setPhase] = useState<GamePhase>('home');
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [levelQuestionIndex, setLevelQuestionIndex] = useState<number>(0); // 0 to 14 overall index
  const [correctInLevel, setCorrectInLevel] = useState<number>(0); // correct count in the current difficulty section
  const [levelQuestions, setLevelQuestions] = useState<Question[]>([]);
  
  // Interactive selection state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isWrongAnswerShaking, setIsWrongAnswerShaking] = useState<boolean>(false);
  
  // Settings & Leaderboard state
  const [isMusicOn, setIsMusicOn] = useState<boolean>(false);
  const [isSfxOn, setIsSfxOn] = useState<boolean>(true);
  const [topScores, setTopScores] = useState<ScoreEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState<boolean>(false);
  const [savingScoreState, setSavingScoreState] = useState<boolean>(false);
  const [scoreSavedSuccessfully, setScoreSavedSuccessfully] = useState<boolean>(false);
  
  // Timer state
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(20); // 20 seconds limit
  const timerRef = useRef<any>(null);
  const [selectedDifficultyStart, setSelectedDifficultyStart] = useState<number>(1); // 1 = Fácil, 2 = Médio, 3 = Difícil, 4 = Difícil Hard

  // Derived current level index
  const currentQuestion = levelQuestions[levelQuestionIndex];
  const currentLevel = currentQuestion ? currentQuestion.level : selectedDifficultyStart;

  // Load leaderboard on initial screen mount
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Keyboard shortcut listener to activate timer with Spacebar or Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        phase === 'playing' && 
        !isTimerActive && 
        !isAnswerChecked && 
        (e.code === 'Space' || e.code === 'Enter')
      ) {
        // Prevent default space page-scrolling behavior
        e.preventDefault();
        setIsTimerActive(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, isTimerActive, isAnswerChecked]);

  // Reset timer on question change
  useEffect(() => {
    if (phase === 'playing') {
      setIsTimerActive(false);
      setTimer(20);
    }
  }, [levelQuestionIndex, phase]);

  // Timer counter handler - only counts down if isTimerActive is true
  useEffect(() => {
    if (phase === 'playing' && !isAnswerChecked && isTimerActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Time ran out: count as wrong answer, play fart sound
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, levelQuestionIndex, isAnswerChecked, isTimerActive]);

  // Audio controllers
  const toggleMusicState = () => {
    const nextState = !isMusicOn;
    setIsMusicOn(nextState);
    if (nextState) {
      audioEngine.startBackgroundMusic();
    } else {
      audioEngine.stopBackgroundMusic();
    }
  };

  const toggleSfxState = () => {
    const nextState = !isSfxOn;
    setIsSfxOn(nextState);
    audioEngine.toggleSound(nextState);
  };

  // Pre-test funny farts and chimes for user enjoyment
  const triggerTestSound = (type: 'correct' | 'fart') => {
    // Insure context is initialized on tap
    if (type === 'correct') {
      audioEngine.playCorrect();
    } else {
      audioEngine.playIncorrectFart();
    }
  };

  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    try {
      const scores = await getTopScores();
      setTopScores(scores);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLeaderboard(false);
    }
  }  // Launch a new session preparing questions from the starting difficulty up to Difícil Hard
  const startNewGame = () => {
    if (!nickname.trim()) {
      alert('Por favor, digite seu nome ou apelido para competir na pontuação global!');
      return;
    }
    
    localStorage.setItem('quiz_biblico_nickname', nickname.trim());
    
    // Auto-trigger background music if sound is enabled and music wasn't actively muted
    if (!isMusicOn) {
      setIsMusicOn(true);
      audioEngine.startBackgroundMusic();
    }

    setScore(0);
    setLives(3);
    setLevelQuestionIndex(0);
    setCorrectInLevel(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScoreSavedSuccessfully(false);
    setIsTimerActive(false);

    // Build the pools from QUESTIONS_POOL
    const easyPool = QUESTIONS_POOL.filter(q => q.level === 1);
    const mediumPool = QUESTIONS_POOL.filter(q => q.level === 2);
    const hardPool = QUESTIONS_POOL.filter(q => q.level === 3);
    const hardHardPool = QUESTIONS_POOL.filter(q => q.level === 4);

    const easyRandom = [...easyPool].sort(() => Math.random() - 0.5).slice(0, 5);
    const mediumRandom = [...mediumPool].sort(() => Math.random() - 0.5).slice(0, 5);
    const hardRandom = [...hardPool].sort(() => Math.random() - 0.5).slice(0, 5);
    const hardHardRandom = [...hardHardPool].sort(() => Math.random() - 0.5).slice(0, 5);

    let finalQuestionsSet: Question[] = [];

    if (selectedDifficultyStart === 1) {
      finalQuestionsSet = [...easyRandom, ...mediumRandom, ...hardRandom, ...hardHardRandom];
    } else if (selectedDifficultyStart === 2) {
      finalQuestionsSet = [...mediumRandom, ...hardRandom, ...hardHardRandom];
    } else if (selectedDifficultyStart === 3) {
      finalQuestionsSet = [...hardRandom, ...hardHardRandom];
    } else {
      finalQuestionsSet = [...hardHardRandom];
    }

    setLevelQuestions(finalQuestionsSet);
    setPhase('playing');
  };

  // Fallback answer trigger on timer run-out
  const handleTimeOut = () => {
    audioEngine.playIncorrectFart();
    setIsAnswerChecked(true);
    setSelectedOption(-1); // No option matches
    setLives((prev) => Math.max(0, prev - 1));
    setIsWrongAnswerShaking(true);
    setTimeout(() => setIsWrongAnswerShaking(false), 500);
  };

  // Click on a multiple-choice item
  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswerChecked) return; // Prevent double taps
    if (!isTimerActive) return; // Prevent premature taps before the moderator triggers the timer

    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedOption(optionIdx);
    setIsAnswerChecked(true);

    const currentQuestion = levelQuestions[levelQuestionIndex];
    if (optionIdx === currentQuestion.correctAnswerIndex) {
      // Correct!
      audioEngine.playCorrect();
      setCorrectInLevel((prev) => prev + 1);
      
      // Calculate points with speed bonus (up to +100 bonus)
      const basePoints = 100 * currentLevel;
      const speedBonus = timer * 5; 
      setScore((prev) => prev + basePoints + speedBonus);
    } else {
      // Incorrect!
      audioEngine.playIncorrectFart();
      setLives((prev) => Math.max(0, prev - 1));
      setIsWrongAnswerShaking(true);
      setTimeout(() => setIsWrongAnswerShaking(false), 500);
    }
  };

  // Advance state
  const handleNextAction = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsTimerActive(false);

    // If out of lives, end immediately
    if (lives <= 0) {
      handleGameOver();
      return;
    }

    const isLevelEnd = (levelQuestionIndex % 5) === 4;
    const isGameEnd = levelQuestionIndex === levelQuestions.length - 1;

    if (isLevelEnd) {
      if (correctInLevel >= 4) {
        if (isGameEnd) {
          // Finished the game completely! Global Victory
          setPhase('victory');
          saveUserScore(score + 1500); // 1500 victory bonus!
        } else {
          // Move to Level Up screen
          setPhase('levelup');
        }
      } else {
        // Did not reach threshold (at least 4 correct)
        handleGameOver();
      }
    } else {
      // Just step forward
      setLevelQuestionIndex((prev) => prev + 1);
    }
  };

  const proceedToNextLevel = () => {
    setLevelQuestionIndex((prev) => prev + 1);
    
    setCorrectInLevel(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsTimerActive(false);

    // Reset lives back to 3 as a reward for levelling up!
    setLives(3);
    setPhase('playing');
  };

  const handleRetryCurrentLevel = () => {
    startNewGame();
  };

  const handleGameOver = () => {
    setPhase('gameover');
    saveUserScore(score);
  };

  const saveUserScore = async (finalScore: number) => {
    setSavingScoreState(true);
    try {
      const success = await saveScore(nickname, finalScore, currentLevel, finalScore > 0 ? Math.round(finalScore / 100) : 0);
      if (success) {
        setScoreSavedSuccessfully(true);
        fetchLeaderboard(); // Update leaderboard view
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingScoreState(false);
    }
  };

  const exitToHome = () => {
    setPhase('home');
    fetchLeaderboard();
  };

  const getLevelLabel = (lvl: number) => {
    switch (lvl) {
      case 1: return 'Fácil';
      case 2: return 'Médio';
      case 3: return 'Difícil';
      case 4: return 'Difícil Hard';
      default: return 'Fácil';
    }
  };

  // Visual helper for difficulty tags
  const getDifficultyColor = (level: number) => {
    switch(level) {
      case 1: return 'from-emerald-500 to-teal-600 bg-emerald-0 opacity-100 text-emerald-300';
      case 2: return 'from-blue-500 to-indigo-600 bg-blue-0 opacity-100 text-indigo-300';
      case 3: return 'from-amber-500 to-orange-600 bg-amber-0 opacity-100 text-amber-300';
      case 4: return 'from-rose-500 to-purple-600 bg-rose-0 opacity-100 text-pink-300';
      default: return 'from-slate-500 to-slate-700 bg-slate-0 opacity-100 text-slate-300';
    }
  };


  return (
    <div className="min-h-screen bg-[#0A0C14] text-slate-100 font-sans flex flex-col antialiased selection:bg-indigo-500/35 selection:text-white relative overflow-x-hidden">
      
      {/* Immersive Top Radial Glow Detail */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_50%_0%,_rgba(99,102,241,0.18)_0%,_rgba(10,12,20,0)_70%)] pointer-events-none z-0"></div>
      
      {/* HEADER BAR */}
      <header className="relative z-10 bg-[#0A0C14]/50 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] text-indigo-400 font-extrabold mb-0.5 flex flex-wrap gap-x-2 gap-y-0.5 items-center">
              <span>Ref. JW.ORG • Desafio Progressivo</span>
              <span className="text-slate-600 font-normal">|</span>
              <span className="text-slate-400 lowercase font-medium tracking-normal">Criado por Daniel Alves (<span className="text-indigo-300 font-mono font-medium select-all">ddj.daniel.alves@gmail.com</span>)</span>
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-serif font-black italic tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                Quiz Bíblico
              </span>
              <div className="h-5 w-5 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Crown className="h-3 w-3 text-amber-400 fill-current" />
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center space-x-3">
            {/* Audio Sfx */}
            <button
              onClick={toggleSfxState}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isSfxOn 
                  ? 'bg-amber-400/10 border-amber-400/20 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.1)] hover:bg-amber-400/20' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
              title={isSfxOn ? "Efeitos sonoros Ativos (Peido do Erro / Acerto)" : "Efeitos sonoros Mudos"}
              id="btn-toggle-sfx"
            >
              {isSfxOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Audio Music */}
            <button
              onClick={toggleMusicState}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isMusicOn 
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.15)] hover:bg-indigo-500/20' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
              title={isMusicOn ? "Música de fundo ambiental Ativa" : "Música de fundo Muda"}
              id="btn-toggle-music"
            >
              <Music className={`h-4 w-4 ${isMusicOn ? 'animate-pulse' : ''}`} />
            </button>

            {nickname && (
              <div className="hidden sm:flex items-center space-x-2 bg-white/5 py-2 px-3.5 rounded-xl border border-white/5 text-xs text-slate-300 font-medium font-mono">
                <User className="h-3.5 w-3.5 text-indigo-400" />
                <span className="truncate max-w-[110px]">{nickname}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-10 flex flex-col justify-center relative z-10">
        
        <AnimatePresence mode="wait">
          
          {/* ================= HOME VIEW ================= */}
          {phase === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Launcher Card */}
              <div className="lg:col-span-7 bg-[#161B33]/70 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 sm:p-10 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-indigo-500/15 to-transparent rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="space-y-6">
                  {/* Visual Intro banner */}
                  <div className="text-left space-y-2.5">
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="h-3 w-3" />
                      <span>ScriptureQuest Bíblico</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold italic text-white tracking-tight leading-tight">
                      Desafio da Verdade • Níveis Progressivos
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                      Teste com sabedoria seus conhecimentos sobre relatos, profecias e história bíblica. Questões inspiradas em pesquisas gratuitas do jw.org.
                    </p>
                  </div>

                  {/* Nickname Input Form */}
                  <div className="space-y-2.5">
                    <label htmlFor="player-nickname" className="block text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      Seu Nome ou Apelido de Jogador
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <User className="h-5 w-5 text-indigo-400" />
                      </div>
                      <input
                        id="player-nickname"
                        type="text"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-900/60 border border-white/5 focus:border-indigo-500 rounded-2xl text-slate-100 placeholder-slate-500 text-sm font-semibold transition-all outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Ex: Thiago, Sara, Ana..."
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      * O apelido permite integrar e gravar seu desempenho no painel global abaixo.
                    </p>
                  </div>

                  {/* Difficulty Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      Selecione o Nível de Partida
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { level: 1, label: 'Fácil', desc: 'Fácil → Médio → Difícil → Hard', badge: 'Lvl 1' },
                        { level: 2, label: 'Médio', desc: 'Médio → Difícil → Hard', badge: 'Lvl 2' },
                        { level: 3, label: 'Difícil', desc: 'Difícil → Hard', badge: 'Lvl 3' },
                        { level: 4, label: 'Difícil Hard', desc: '5 Desafios Master Hard', badge: 'Lvl 4' },
                      ].map((dif) => {
                        const isSelected = selectedDifficultyStart === dif.level;
                        return (
                          <button
                            key={dif.level}
                            onClick={() => setSelectedDifficultyStart(dif.level)}
                            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer group/item ${
                              isSelected 
                                ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500' 
                                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/15 hover:bg-slate-900/60'
                            }`}
                            id={`difficulty-select-btn-${dif.level}`}
                          >
                            <span className={`text-[10px] font-black uppercase tracking-wider mb-1 ${isSelected ? 'text-indigo-300' : 'text-slate-500'}`}>
                              {dif.badge}
                            </span>
                            <span className={`font-bold text-xs sm:text-sm tracking-tight mb-0.5 transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover/item:text-white'}`}>{dif.label}</span>
                            <span className="text-[9px] text-slate-500 leading-tight block">{dif.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={startNewGame}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white py-4 px-6 rounded-2xl font-black shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
                    id="btn-start-quiz"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    <span>Iniciar Desafio das Escrituras</span>
                  </button>

                  {/* Funny Sound Test Panel */}
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4.5 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Efeitos Sonoros Disponibilizados</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sintetizamos áudios ideais em tempo real: música ambiente suave, sinos cristalinos no acerto e o divertido som de peido (fart) ao falhar.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <button
                        onClick={() => triggerTestSound('correct')}
                        className="py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"></span>
                        <span>Testar Acerto 😊</span>
                      </button>
                      <button
                        onClick={() => triggerTestSound('fart')}
                        className="py-2.5 px-3 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-400 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_#f87171]"></span>
                        <span>Testar Peido 💨</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rules of engagement */}
                <div className="text-xs text-slate-400 border-t border-white/5 pt-4 space-y-2">
                  <div className="font-bold text-indigo-400 uppercase tracking-widest text-[9px]">Instruções para Avançar de Nível:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                    <div className="flex items-center space-x-2">
                      <span className="text-rose-400">❤️</span>
                      <span>3 Vidas com limite de tempo de 20s</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-400">🎯</span>
                      <span>Necessário 4 acertos (80%) para o nível seguinte</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Leaderboard panel */}
              <div className="lg:col-span-5 bg-[#161B33]/40 backdrop-blur-xl text-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white/5 flex flex-col justify-between space-y-6">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center space-x-2.5">
                      <Trophy className="h-5 w-5 text-amber-400" />
                      <h3 className="font-black text-lg tracking-tight text-white font-serif italic">
                        Placar Global
                      </h3>
                    </div>
                    <button 
                      onClick={fetchLeaderboard}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                      title="Atualizar ranking"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {loadingLeaderboard ? (
                    <div className="flex-1 py-16 flex flex-col items-center justify-center space-y-3">
                      <span className="animate-spin text-indigo-400 text-2xl">⏳</span>
                      <span className="text-xs text-slate-400 font-mono">Consolidando registros...</span>
                    </div>
                  ) : topScores.length === 0 ? (
                    <div className="flex-1 py-16 text-center flex flex-col items-center justify-center">
                      <Compass className="h-10 w-10 text-indigo-500/30 mb-2" />
                      <p className="text-xs text-slate-400 font-bold">Ainda sem histórico</p>
                      <p className="text-[10px] text-slate-500 mt-1">Sua vez de gravar a pontuação!</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 flex-1">
                      {topScores.map((leader, index) => {
                        return (
                          <div
                            key={leader.id || index}
                            className={`flex items-center justify-between py-2.5 px-4 rounded-xl border transition-all text-xs ${
                              index === 0 
                                ? 'bg-amber-400/5 border-amber-400/20' 
                                : 'bg-white/2 border-white/5 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center space-x-3 truncate">
                              <span className={`w-5 font-mono font-black text-center text-sm ${
                                index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-300' : index === 2 ? 'text-indigo-400' : 'text-slate-500'
                              }`}>
                                {index + 1}
                              </span>
                              <span className="font-bold text-slate-100 truncate">{leader.name}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3 text-right">
                              <span className="text-[10px] text-slate-500 font-mono">
                                Nível {leader.levelReached}
                              </span>
                              <span className={`font-mono font-bold ${index === 0 ? 'text-amber-400' : 'text-indigo-300'}`}>
                                {leader.score.toLocaleString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                <div className="bg-[#0A0C14]/55 rounded-2xl p-4 text-[10px] text-slate-400 border border-white/5 flex space-x-2.5 items-center">
                  <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span className="leading-relaxed">Sincronização persistente baseada no Firebase Firestore da sua conta Cloud.</span>
                </div>
              </div>

            </motion.div>
          )}

          {/* ================= PLAYING GAME VIEW ================= */}
          {phase === 'playing' && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full max-w-3xl mx-auto space-y-6 relative ${isWrongAnswerShaking ? 'animate-shake' : ''}`}
            >
              
              {/* TOP HEADER COMPONENT (Level Name, Lives, Score) */}
              <div className="bg-[#161B33]/80 backdrop-blur-xl rounded-[24px] p-5 shadow-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r text-white ${getDifficultyColor(currentLevel)} shadow-[0_2px_10px_rgba(0,0,0,0.15)]`}>
                    Nível {currentLevel} • {currentQuestion.levelName}
                  </span>
                  <div className="text-xs text-slate-400">
                    Pergunta <span className="font-black text-white">{levelQuestionIndex + 1}</span> de <span className="font-bold text-slate-400">{levelQuestions.length}</span>
                    <span className="text-slate-500 ml-1.5 font-medium">({(levelQuestionIndex % 5) + 1} de 5 deste Nível)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
                  {/* Hearts / Lives indicator */}
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((heartNum) => (
                      <div 
                        key={heartNum}
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                          heartNum <= lives 
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.65)]' 
                           : 'bg-slate-800'
                        }`}
                        title={`${lives} Vidas Restantes`}
                      />
                    ))}
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest block">Pontuação</span>
                    <span className="text-xl font-mono font-bold text-amber-400 block -mt-1">
                      {score.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5 p-[1px]">
                <div 
                  className="bg-gradient-to-r from-indigo-600 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                  style={{ width: `${(levelQuestionIndex / levelQuestions.length) * 100}%` }}
                ></div>
              </div>

              {/* LEVEL RULES OR CURRENT RATIO WRAPPER */}
              <div className="text-xs text-center text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 py-2 px-4 rounded-full flex items-center justify-center space-x-2 max-w-lg mx-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                <span>Meta do Nível {currentLevel} ({currentQuestion.levelName}):</span>
                <span className="font-bold text-white">Acertos: {correctInLevel} de 5</span>
                <span className="text-[10px] text-slate-400">(Necessário: {'>'}= 4)</span>
              </div>

              {/* QUESTION CARD */}
              <div className="bg-[#161B33]/90 backdrop-blur-3xl rounded-[36px] border border-white/5 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
                
                {/* Timer line indicator */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-950/40">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      timer > 10 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : timer > 5 ? 'bg-amber-400' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                    }`}
                    style={{ width: `${(isTimerActive ? (timer / 20) : 1) * 100}%` }}
                  ></div>
                </div>

                {/* Card Header information */}
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-2 bg-white/5 py-1 px-3 rounded-lg border border-white/5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                    <span className="font-bold text-slate-300 uppercase tracking-widest text-[9px]">{currentQuestion.theme}</span>
                  </div>
                  
                  {/* Timer counter badge (status) */}
                  <div className={`flex items-center space-x-1.5 font-mono font-bold text-sm ${timer <= 5 ? 'text-red-400' : 'text-slate-300'}`}>
                    <Clock className={`h-4 w-4 ${timer <= 5 && isTimerActive ? 'animate-bounce text-red-500' : 'text-indigo-400'}`} />
                    <span>{isTimerActive ? `Tempo: ${timer}s` : 'Tempo Pausado'}</span>
                  </div>
                </div>

                {/* Substantive Question statement */}
                <h3 className="text-2xl sm:text-3xl text-center font-serif leading-relaxed text-slate-100 italic font-semibold max-w-2xl mx-auto">
                  “{currentQuestion.question}”
                </h3>

                {/* MODERATOR CONTROL: INITIALIZE TIMER (FITS BUZZER LOGIC PERFECTLY) */}
                {!isTimerActive && !isAnswerChecked && (
                  <div className="bg-indigo-600/90 border border-indigo-500/30 p-5 rounded-2xl text-center space-y-3.5 relative overflow-hidden shadow-2xl animate-pulse">
                    <div className="absolute top-0 right-0 p-1 opacity-5">
                      <Clock className="w-24 h-24 rotate-12" />
                    </div>
                    <div className="space-y-1 relative z-10">
                      <h4 className="font-bold text-white text-base">Aguardando Resposta do Participante</h4>
                      <p className="text-xs text-indigo-100">
                        O participante que quer responder deve apertar o botão físico. Assim que ele apertar e você disser <span className="italic font-bold">"Tempo para resposta!"</span>, clique abaixo ou aperte a <span className="font-bold bg-white/25 px-1.5 py-0.5 rounded text-white font-mono">Barra de Espaço</span> para iniciar o cronômetro!
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => setIsTimerActive(true)}
                        className="relative z-10 py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer inline-flex items-center space-x-2"
                        id="btn-activate-timer"
                      >
                        <Play className="h-4 w-4 fill-current text-slate-950" />
                        <span>Ativar Tempo para Resposta (20s)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* MULTIPLE OPTION LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((optionText, index) => {
                    // Decide state style for option buttons
                    let btnStyle = 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-slate-200';
                    let isCheckedOption = selectedOption === index;
                    let isCorrectOption = index === currentQuestion.correctAnswerIndex;

                    if (!isTimerActive && !isAnswerChecked) {
                      btnStyle = 'border-white/5 bg-white/2 opacity-40 hover:none cursor-not-allowed text-slate-400';
                    } else if (isAnswerChecked) {
                      if (isCorrectOption) {
                        btnStyle = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
                      } else if (isCheckedOption) {
                        btnStyle = 'border-red-500/50 bg-red-500/10 text-red-300 ring-1 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]';
                      } else {
                        btnStyle = 'border-white/2 bg-white/2 opacity-30 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={index}
                        disabled={!isTimerActive || isAnswerChecked}
                        onClick={() => handleOptionSelect(index)}
                        className={`group relative flex items-center p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${btnStyle}`}
                        id={`option-btn-${index}`}
                      >
                        {/* Selector label */}
                        <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold mr-4 shrink-0 transition-colors ${
                          isAnswerChecked && isCorrectOption 
                            ? 'bg-emerald-500 text-slate-950' 
                            : isAnswerChecked && isCheckedOption 
                            ? 'bg-red-500 text-white' 
                            : 'bg-slate-900 border border-white/5 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span className="text-sm sm:text-base font-semibold leading-tight flex-1">{optionText}</span>

                        {/* Selected Indicator status on right */}
                        {isAnswerChecked && isCorrectOption && (
                          <div className="absolute top-2 right-4 text-[9px] uppercase font-bold text-emerald-400">Correto</div>
                        )}
                        {isAnswerChecked && isCheckedOption && !isCorrectOption && (
                          <div className="absolute top-2 right-4 text-[9px] uppercase font-bold text-red-400">Incorreto</div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* DISCOVERY ACCORDION (Reveals exactly on complete response) */}
                <AnimatePresence>
                  {isAnswerChecked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-indigo-950/40 border border-white/5 rounded-2xl p-5 space-y-2.5 text-xs text-slate-300"
                    >
                      <div className="flex items-center space-x-1.5 font-bold text-indigo-400 text-sm">
                        <BookOpen className="h-4 w-4" />
                        <span>Estudo da Bíblia e Referências:</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-indigo-200 font-medium text-base">
                        <CornerDownRight className="h-4 w-4 text-indigo-400" />
                        <span>Pesquisa em jw.org: <span className="font-serif italic font-bold text-white underline">{currentQuestion.citation}</span></span>
                      </div>
                      
                      <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                        * Use essa passagem sobre o relato para continuar estudando e aumentando seu conhecimento da Bíblia durante sua Hora de Estudo Pessoal ou Adoração em Família semanal.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOTTOM COMPONENT CONTROLS (ADVANCE BUTTON) */}
                {isAnswerChecked && (
                  <div className="flex justify-end pt-2 border-t border-white/5">
                    <button
                      onClick={handleNextAction}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl flex items-center space-x-2 transition-all hover:translate-x-1 text-sm shadow-md cursor-pointer"
                      id="btn-next-question"
                    >
                      <span>Avançar Desafio</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

              </div>

            </motion.div>
          )}

          {/* ================= LEVEL UP VIEW ================= */}
          {phase === 'levelup' && (
            <motion.div
              key="levelup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto bg-[#161B33]/80 backdrop-blur-xl border border-white/5 shadow-2xl rounded-[36px] p-6 sm:p-10 text-center space-y-6"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-tr from-emerald-500 to-teal-600 text-white p-6 rounded-full shadow-lg">
                  <Award className="h-10 w-10 text-white fill-current" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-serif font-bold italic text-white">
                  Nível Concluído! 🎉
                </h2>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Excelente conhecimento bíblico! Você passou pela seção <span className="font-bold text-indigo-400">{getLevelLabel(currentLevel)}</span> com pelo menos 4 de 5 acertos!
                </p>
              </div>

              {/* Bonus Card */}
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4.5 grid grid-cols-2 gap-4 divide-x divide-white/5">
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Bônus Adicional</span>
                  <span className="text-lg font-mono font-bold text-indigo-400">+500 Pontos</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Vidas Concedidas</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">3 ❤️ (Cheio)</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <button
                  onClick={proceedToNextLevel}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
                  id="btn-proceed-level"
                >
                  <span>Ir para o Nível {getLevelLabel(currentLevel + 1)}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= GAME OVER VIEW ================= */}
          {phase === 'gameover' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto bg-[#161B33]/80 backdrop-blur-xl border border-white/5 shadow-2xl rounded-[36px] p-6 sm:p-10 text-center space-y-6"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full"></div>
                <div className="relative bg-white/5 text-slate-400 p-6 rounded-full border border-white/5">
                  <RotateCcw className="h-10 w-10 text-indigo-400" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-serif font-bold italic text-white">
                  Fim de Jogo! 💨
                </h2>
                <div className="text-xs text-red-400 font-bold bg-ref-500/10 border border-red-500/20 px-3.5 py-1 rounded-full inline-block">
                  {lives <= 0 ? 'Você esgotou suas vidas!' : `Acertou apenas ${correctInLevel} de 5 perguntas faróis!`}
                </div>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed mt-2 p-1">
                  Não desanime! O estudo da Bíblia é reconfortante e progressivo. Recupere as forças, continue aumentando seu conhecimento espiritual e tente novamente.
                </p>
              </div>

              {/* Total points card */}
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-550 tracking-widest block">Sua Pontuação</span>
                <div className="text-3xl font-mono font-black text-amber-400">
                  {score.toLocaleString('pt-BR')} Pontos
                </div>
                <div className="text-xs text-slate-400">
                  Parou na seção <span className="font-semibold text-indigo-300">{getLevelLabel(currentLevel)}</span>
                </div>
              </div>

              {savingScoreState ? (
                <p className="text-xs text-indigo-300 animate-pulse">
                  Conectando placar com o servidor global...
                </p>
              ) : scoreSavedSuccessfully ? (
                <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center space-x-1.5 bg-emerald-500/5 py-1 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Pontuação salva com sucesso no Ranking!</span>
                </p>
              ) : null}

              {/* Action buttons */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                <button
                  onClick={startNewGame}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-3.5 px-6 rounded-2xl shadow transition-all text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                  id="btn-new-attempt"
                >
                  <Play className="h-3.5 w-3.5 fill-current shrink-0 text-white" />
                  <span>Tentar Novamente (Reiniciar)</span>
                </button>
              </div>

              <button
                onClick={exitToHome}
                className="w-full text-xs text-slate-500 hover:text-slate-300 font-semibold transition-all pt-1 block cursor-pointer"
              >
                Voltar ao Menu Inicial
              </button>
            </motion.div>
          )}

          {/* ================= VICTORY VIEW ================= */}
          {phase === 'victory' && (
            <motion.div
              key="victory"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto bg-gradient-to-b from-[#161B33] to-[#0A0C14] text-white p-6 sm:p-10 text-center space-y-6 rounded-[36px] shadow-2xl relative overflow-hidden border border-white/5"
            >
              {/* Glow details */}
              <div className="absolute top-5 left-5 h-2 w-2 rounded-full bg-amber-400 animate-ping"></div>
              <div className="absolute bottom-5 right-5 h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping"></div>

              <div className="relative inline-block">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 p-6 rounded-full shadow-lg">
                  <Crown className="h-10 w-10 fill-current animate-bounce" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-serif font-bold italic bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent leading-snug">
                  Mestre das Escrituras! 👑
                </h2>
                <p className="text-[10px] text-indigo-400 font-black tracking-[0.25em] uppercase">
                  Desafio Progressivo Concluído
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Grandioso estudo! Você provou dedicação exemplar passando com maestria por todos os níveis deste desafio bíblico de excelência. Seu nome foi eternizado.
                </p>
              </div>

              {/* Total points card */}
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Sua Pontuação (+1.000 Vitória Bônus)</span>
                <div className="text-4xl font-mono font-black text-amber-400">
                  {score.toLocaleString('pt-BR')} Pontos
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Estudo Metódico & Conhecimento Profundo • JW.ORG
                </div>
              </div>

              {savingScoreState ? (
                <p className="text-xs text-indigo-300 animate-pulse">
                  Unindo sua pontuação de campeão ao placar...
                </p>
              ) : scoreSavedSuccessfully ? (
                <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center space-x-1.5 bg-emerald-500/5 py-1 rounded-xl">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Seu placar imortalizado globalmente!</span>
                </p>
              ) : null}

              {/* Action buttons */}
              <button
                onClick={exitToHome}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold py-4 px-6 rounded-xl hover:scale-[1.01] transition-all text-sm cursor-pointer shadow-lg shadow-indigo-500/10"
                id="btn-victory-home"
              >
                Voltar ao Menu & Ranking Global
              </button>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* FOOTER BAR */}
      <footer className="relative z-10 bg-slate-950/40 border-t border-white/5 py-5 px-4 text-center text-xs text-slate-500 mt-8">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <p>
            As perguntas deste desafio são extraídas diretamente da Bíblia Sagrada. Todo o material e conteúdo oficial do <span className="font-bold text-indigo-400">JW.ORG®</span> são protegidos pelas leis de direitos autorais.
          </p>
          <p className="text-[10px] text-slate-600">
            Este aplicativo não possui fins lucrativos e foi construído de forma independente como um quiz educativo para entretenimento saudável cristão.
          </p>
        </div>
      </footer>

    </div>
  );
}
