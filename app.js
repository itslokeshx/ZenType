const { useState, useEffect, useRef, createContext, useContext } = React;

// ==================== TAMIL MARUTHAM KEYBOARD LAYOUT ====================
const MARUTHAM_LAYOUT = {
  '`': { normal: 'ஃ', shifted: '*' },
  '1': { normal: 'ஸ', shifted: '"' },
  '2': { normal: '"', shifted: '#' },
  '3': { normal: '#', shifted: 'ஐ' },
  '4': { normal: 'ஐ', shifted: '%' },
  '5': { normal: '%', shifted: '^' },
  '6': { normal: '^', shifted: 'ஷ' },
  '7': { normal: 'ஷ', shifted: '*' },
  '8': { normal: '*', shifted: '(' },
  '9': { normal: '(', shifted: ')' },
  '0': { normal: ')', shifted: '/' },
  '-': { normal: 'ஶ்ரீ', shifted: 'ஶ்ரீ' },
  '=': { normal: '=', shifted: 'ஹ' },
  '\\': { normal: '/', shifted: 'க்ஷ' },
  
  'q': { normal: 'ஞ', shifted: 'ஞு' },
  'w': { normal: 'று', shifted: 'றூ' },
  'e': { normal: 'நு', shifted: 'நூ' },
  'r': { normal: 'சு', shifted: 'சூ' },
  't': { normal: 'வ', shifted: 'கூ' },
  'y': { normal: 'லு', shifted: 'லூ' },
  'u': { normal: 'ரு', shifted: 'ரூ' },
  'i': { normal: 'ை', shifted: 'ஐ' },
  'o': { normal: 'டி', shifted: 'ம' },
  'p': { normal: 'ா', shifted: '*' },
  '[': { normal: 'ு', shifted: 'ூ' },
  ']': { normal: 'ி', shifted: 'ீ' },
  
  'a': { normal: 'யு', shifted: 'யூ' },
  's': { normal: 'ளு', shifted: 'ளூ' },
  'd': { normal: 'னு', shifted: 'னூ' },
  'f': { normal: 'கு', shifted: 'கூ' },
  'g': { normal: 'ழு', shifted: 'ழூ' },
  'h': { normal: 'ழ', shifted: 'ழா' },
  'j': { normal: 'து', shifted: 'தூ' },
  'k': { normal: 'மு', shifted: 'மூ' },
  'l': { normal: 'டு', shifted: 'டூ' },
  ';': { normal: '.', shifted: 'ட்' },
  "'": { normal: 'ஞ', shifted: 'ங' },
  
  'z': { normal: 'ணு', shifted: 'ணூ' },
  'x': { normal: 'ஒ', shifted: 'ஓ' },
  'c': { normal: 'உ', shifted: 'ஊ' },
  'v': { normal: 'எ', shifted: 'ஏ' },
  'b': { normal: 'ெ', shifted: 'ை' },
  'n': { normal: 'ே', shifted: 'ௌ' },
  'm': { normal: 'அ', shifted: 'ஆ' },
  ',': { normal: 'இ', shifted: 'ஈ' },
  '.': { normal: '.', shifted: '?' }
};

// ==================== WORD POOLS ====================
const ENGLISH_WORDS = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her',
  'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how',
  'man', 'new', 'now', 'old', 'see', 'time', 'very', 'way', 'who', 'boy',
  'came', 'come', 'does', 'each', 'find', 'first', 'good', 'great', 'help', 'here',
  'just', 'know', 'last', 'like', 'little', 'long', 'look', 'make', 'many', 'more',
  'most', 'much', 'only', 'other', 'over', 'right', 'said', 'same', 'should', 'some',
  'such', 'take', 'than', 'that', 'their', 'them', 'then', 'there', 'these', 'thing',
  'think', 'this', 'three', 'through', 'want', 'well', 'went', 'were', 'what', 'when',
  'where', 'which', 'while', 'with', 'work', 'world', 'would', 'write', 'year', 'your',
  'about', 'after', 'again', 'also', 'back', 'because', 'before', 'being', 'best', 'better',
  'between', 'both', 'call', 'could', 'different', 'down', 'even', 'every', 'feel', 'follow',
  'found', 'give', 'going', 'hand', 'high', 'home', 'house', 'into', 'keep', 'large',
  'later', 'learn', 'leave', 'left', 'life', 'line', 'live', 'made', 'mean', 'might',
  'move', 'must', 'name', 'need', 'never', 'next', 'number', 'off', 'often', 'once',
  'open', 'part', 'people', 'place', 'play', 'point', 'put', 'read', 'really', 'run',
  'school', 'seem', 'show', 'side', 'small', 'something', 'start', 'still', 'story', 'study',
  'system', 'tell', 'thank', 'those', 'together', 'too', 'turn', 'under', 'until', 'use',
  'used', 'very', 'water', 'week', 'without', 'word', 'years', 'young'
];

const TAMIL_WORDS = [
  'அது', 'இது', 'என்ன', 'எப்படி', 'எங்கே', 'எப்போது', 'யார்', 'எதற்கு', 'ஏன்', 'என்',
  'நான்', 'நீ', 'அவர்', 'அவள்', 'நாம்', 'நீங்கள்', 'அவர்கள்', 'என்னுடைய', 'உன்னுடைய', 'அவருடைய',
  'நம்முடைய', 'உங்களுடைய', 'அவர்களுடைய', 'இந்த', 'அந்த', 'ஒரு', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஐந்து',
  'பல', 'சில', 'எல்லா', 'வேறு', 'மற்ற', 'பெரிய', 'சிறிய', 'நல்ல', 'கெட்ட', 'புதிய',
  'பழைய', 'மனிதர்', 'பெண்', 'ஆண்', 'குழந்தை', 'தாய்', 'தந்தை', 'வீடு', 'ஊர்', 'நாடு',
  'உலகம்', 'நேரம்', 'நாள்', 'வருடம்', 'கை', 'கால்', 'தலை', 'உடல்', 'கண்', 'காது',
  'வாய்', 'மூக்கு', 'தண்ணீர்', 'உணவு', 'அன்பு', 'மகிழ்ச்சி', 'துன்பம்', 'பணம்', 'வேலை', 'பள்ளி',
  'புத்தகம்', 'எழுது', 'படி', 'பேசு', 'போ', 'வா', 'பார்', 'கேள்', 'சொல்', 'செய்',
  'இரு', 'உண்', 'குடி', 'தூங்கு', 'விளையாடு', 'ஓடு', 'நட', 'உட்கார்', 'நில்', 'படு',
  'எழு', 'கொடு', 'வாங்கு', 'விடு', 'பிடி', 'அடி', 'வெட்டு', 'கட்டு', 'திற', 'மூடு',
  'அழு', 'சிரி', 'பாடு', 'ஆடு', 'எண்ணு', 'நினை', 'மற', 'நம்பு', 'விரும்பு', 'வெறு',
  'காதல்', 'நட்பு', 'உறவு', 'குடும்பம்', 'சமூகம்', 'அரசு', 'நகரம்', 'கிராமம்', 'தெரு', 'சாலை',
  'பாலம்', 'கடல்', 'ஆறு', 'மலை', 'காடு', 'வயல்', 'தோட்டம்', 'மரம்', 'செடி', 'பூ',
  'பழம்', 'காய்', 'அரிசி', 'கோதுமை', 'பால்', 'முட்டை', 'மீன்', 'கோழி', 'ஆடு', 'மாடு',
  'நாய்', 'பூனை', 'பறவை', 'பாம்பு', 'எலி', 'குதிரை', 'யானை', 'சிங்கம்', 'புலி', 'கரடி',
  'வெள்ளை', 'கருப்பு', 'சிவப்பு', 'நீலம்', 'பச்சை', 'மஞ்சள்', 'ஊதா', 'பழுப்பு', 'சாம்பல்', 'ஆரஞ்சு'
];

// ==================== GLOBAL STATE CONTEXT ====================
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');
  const [timerDuration, setTimerDuration] = useState(30);
  const [customTime, setCustomTime] = useState('');
  const [gameStatus, setGameStatus] = useState('idle');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [stats, setStats] = useState({
    correctKeystrokes: 0,
    incorrectKeystrokes: 0,
    correctWords: 0,
    wrongWords: 0
  });
  const [activeKey, setActiveKey] = useState(null);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const value = {
    theme, setTheme,
    language, setLanguage,
    timerDuration, setTimerDuration,
    customTime, setCustomTime,
    gameStatus, setGameStatus,
    timeRemaining, setTimeRemaining,
    words, setWords,
    currentWordIndex, setCurrentWordIndex,
    currentInput, setCurrentInput,
    stats, setStats,
    activeKey, setActiveKey,
    shiftPressed, setShiftPressed,
    showResults, setShowResults
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = () => useContext(AppContext);

// ==================== UTILITY FUNCTIONS ====================
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generateWords = (language, count = 50) => {
  const wordPool = language === 'english' ? ENGLISH_WORDS : TAMIL_WORDS;
  const shuffled = shuffleArray(wordPool);
  return shuffled.slice(0, count).map((text, index) => ({
    id: `word-${index}-${Date.now()}`,
    text,
    status: index === 0 ? 'current' : 'pending'
  }));
};

// ==================== HEADER COMPONENT ====================
const Header = () => {
  const { theme, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} shadow-lg transition-smooth`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'} flex items-center justify-center shadow-lg`}>
              <span className="text-white text-xl font-bold">Z</span>
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                ZenType Tamil
              </h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Premium Typing Practice
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg transition-smooth ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// ==================== CONTROL PANEL COMPONENT ====================
const ControlPanel = () => {
  const {
    theme,
    language,
    setLanguage,
    timerDuration,
    setTimerDuration,
    customTime,
    setCustomTime,
    gameStatus,
    setGameStatus,
    setTimeRemaining,
    setWords,
    setCurrentWordIndex,
    setCurrentInput,
    setStats,
    setShowResults
  } = useApp();

  const handleLanguageChange = (lang) => {
    if (gameStatus === 'playing') return;
    setLanguage(lang);
    resetGame();
  };

  const handleTimerChange = (duration) => {
    if (gameStatus === 'playing') return;
    setTimerDuration(duration);
    setTimeRemaining(duration);
    setCustomTime('');
  };

  const handleCustomTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 600)) {
      setCustomTime(value);
      if (value !== '') {
        const duration = parseInt(value);
        setTimerDuration(duration);
        setTimeRemaining(duration);
      }
    }
  };

  const resetGame = () => {
    setGameStatus('idle');
    setCurrentInput('');
    setCurrentWordIndex(0);
    setStats({
      correctKeystrokes: 0,
      incorrectKeystrokes: 0,
      correctWords: 0,
      wrongWords: 0
    });
    setShowResults(false);
    const newWords = generateWords(language);
    setWords(newWords);
  };

  const handleStop = () => {
    setGameStatus('finished');
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Language Switcher */}
      <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-2xl p-6 mb-6 shadow-xl transition-smooth`}>
        <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Language / மொழி
        </label>
        <div className="flex space-x-3">
          <button
            onClick={() => handleLanguageChange('english')}
            disabled={gameStatus === 'playing'}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-smooth ${
              language === 'english'
                ? theme === 'dark'
                  ? 'bg-blue-500 text-white shadow-lg glow'
                  : 'bg-blue-600 text-white shadow-lg glow'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${gameStatus === 'playing' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('tamil')}
            disabled={gameStatus === 'playing'}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold tamil-font transition-smooth ${
              language === 'tamil'
                ? theme === 'dark'
                  ? 'bg-blue-500 text-white shadow-lg glow'
                  : 'bg-blue-600 text-white shadow-lg glow'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${gameStatus === 'playing' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* Timer Selector */}
      <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-2xl p-6 shadow-xl transition-smooth`}>
        <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Timer Duration
        </label>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[15, 30, 60].map((duration) => (
            <button
              key={duration}
              onClick={() => handleTimerChange(duration)}
              disabled={gameStatus === 'playing'}
              className={`py-3 px-4 rounded-xl font-semibold transition-smooth ${
                timerDuration === duration && customTime === ''
                  ? theme === 'dark'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-blue-600 text-white shadow-lg'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${gameStatus === 'playing' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              {duration}s
            </button>
          ))}
          <input
            type="number"
            value={customTime}
            onChange={handleCustomTimeChange}
            disabled={gameStatus === 'playing'}
            placeholder="Custom"
            min="1"
            max="600"
            className={`py-3 px-4 rounded-xl font-semibold text-center transition-smooth ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-100 placeholder-gray-500 border-gray-600'
                : 'bg-gray-200 text-gray-900 placeholder-gray-500 border-gray-300'
            } border-2 focus:border-blue-500 ${gameStatus === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>

        {gameStatus === 'playing' && (
          <button
            onClick={handleStop}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-smooth ${
              theme === 'dark'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            } shadow-lg hover:scale-105`}
          >
            Stop Test
          </button>
        )}
      </div>
    </div>
  );
};

// ==================== TYPING ENGINE COMPONENT ====================
const TypingEngine = () => {
  const {
    theme,
    language,
    gameStatus,
    setGameStatus,
    timeRemaining,
    setTimeRemaining,
    timerDuration,
    words,
    setWords,
    currentWordIndex,
    setCurrentWordIndex,
    currentInput,
    setCurrentInput,
    stats,
    setStats,
    setActiveKey,
    setShiftPressed,
    setShowResults
  } = useApp();

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize words on mount and language change
  useEffect(() => {
    const newWords = generateWords(language);
    setWords(newWords);
    setCurrentWordIndex(0);
    setCurrentInput('');
  }, [language]);

  // Timer logic
  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0.1) {
            clearInterval(timerRef.current);
            setGameStatus('finished');
            setShowResults(true);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  // Focus input when game starts
  useEffect(() => {
    if (gameStatus === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStatus]);

  const handleKeyDown = (e) => {
    // Start game on first keypress
    if (gameStatus === 'idle') {
      setGameStatus('playing');
      setTimeRemaining(timerDuration);
    }

    if (gameStatus !== 'playing') return;

    const key = e.key;
    const keyLower = key.toLowerCase();

    // Track shift state
    if (key === 'Shift') {
      setShiftPressed(true);
      return;
    }

    // Handle Tamil input
    if (language === 'tamil') {
      e.preventDefault();

      if (key === 'Backspace') {
        if (currentInput.length > 0) {
          const newInput = [...currentInput].slice(0, -1).join('');
          setCurrentInput(newInput);
        }
        return;
      }

      if (key === ' ' || key === 'Enter') {
        handleWordComplete();
        return;
      }

      if (MARUTHAM_LAYOUT[keyLower]) {
        const mapping = MARUTHAM_LAYOUT[keyLower];
        const tamilChar = e.shiftKey ? mapping.shifted : mapping.normal;
        const newInput = currentInput + tamilChar;
        setCurrentInput(newInput);

        // Track keystroke
        const currentWord = words[currentWordIndex];
        const isCorrect = currentWord && currentWord.text.startsWith(newInput);
        setStats(prev => ({
          ...prev,
          correctKeystrokes: prev.correctKeystrokes + (isCorrect ? 1 : 0),
          incorrectKeystrokes: prev.incorrectKeystrokes + (isCorrect ? 0 : 1)
        }));

        // Highlight virtual key
        setActiveKey(keyLower);
        setTimeout(() => setActiveKey(null), 100);
      }
    } else {
      // English input
      if (key === ' ' || key === 'Enter') {
        e.preventDefault();
        handleWordComplete();
        return;
      }

      if (key === 'Backspace') {
        return; // Let default behavior handle it
      }

      if (key.length === 1) {
        const currentWord = words[currentWordIndex];
        const newInput = currentInput + key;
        const isCorrect = currentWord && currentWord.text.startsWith(newInput);
        
        setStats(prev => ({
          ...prev,
          correctKeystrokes: prev.correctKeystrokes + (isCorrect ? 1 : 0),
          incorrectKeystrokes: prev.incorrectKeystrokes + (isCorrect ? 0 : 1)
        }));
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Shift') {
      setShiftPressed(false);
    }
  };

  const handleWordComplete = () => {
    if (currentInput.trim() === '') return;

    const currentWord = words[currentWordIndex];
    const isCorrect = currentInput.trim() === currentWord.text;

    // Update word status
    setWords(prev => prev.map((word, idx) => {
      if (idx === currentWordIndex) {
        return { ...word, status: isCorrect ? 'correct' : 'incorrect' };
      }
      if (idx === currentWordIndex + 1) {
        return { ...word, status: 'current' };
      }
      return word;
    }));

    // Update stats
    setStats(prev => ({
      ...prev,
      correctWords: prev.correctWords + (isCorrect ? 1 : 0),
      wrongWords: prev.wrongWords + (isCorrect ? 0 : 1)
    }));

    // Move to next word
    setTimeout(() => {
      setCurrentWordIndex(prev => prev + 1);
      setCurrentInput('');

      // Generate more words if running low
      if (currentWordIndex >= words.length - 10) {
        const newWords = generateWords(language, 20);
        setWords(prev => [...prev, ...newWords]);
      }
    }, 300);
  };

  const handleInputChange = (e) => {
    if (language === 'english') {
      setCurrentInput(e.target.value);
    }
  };

  const currentWord = words[currentWordIndex];
  const displayWords = words.slice(Math.max(0, currentWordIndex - 2), currentWordIndex + 10);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Timer Display */}
      <div className="text-center mb-8">
        <div className={`inline-block px-8 py-4 rounded-2xl ${
          theme === 'dark' ? 'glass-dark' : 'glass-light'
        } shadow-xl`}>
          <div className={`text-5xl font-bold ${
            timeRemaining <= 10 && gameStatus === 'playing'
              ? 'text-red-500 animate-pulse'
              : theme === 'dark'
              ? 'text-blue-400'
              : 'text-blue-600'
          }`}>
            {Math.floor(timeRemaining / 60)}:{String(Math.floor(timeRemaining % 60)).padStart(2, '0')}
          </div>
          <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {gameStatus === 'idle' ? 'Start typing to begin' : gameStatus === 'playing' ? 'Time remaining' : 'Finished'}
          </div>
        </div>
      </div>

      {/* Word Display */}
      <div
        className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-2xl p-8 shadow-xl min-h-[200px] mb-8 cursor-text`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={`text-3xl leading-relaxed flex flex-wrap gap-3 ${language === 'tamil' ? 'tamil-font' : ''}`}>
          {displayWords.map((word, idx) => {
            const globalIdx = Math.max(0, currentWordIndex - 2) + idx;
            const isCurrent = globalIdx === currentWordIndex;
            const isPast = globalIdx < currentWordIndex;

            return (
              <span
                key={word.id}
                className={`transition-smooth ${
                  word.status === 'correct'
                    ? 'fade-out text-green-500'
                    : word.status === 'incorrect'
                    ? 'shake text-red-500'
                    : isCurrent
                    ? theme === 'dark'
                      ? 'text-blue-400 font-bold'
                      : 'text-blue-600 font-bold'
                    : isPast
                    ? 'opacity-30'
                    : theme === 'dark'
                    ? 'text-gray-400 opacity-60'
                    : 'text-gray-600 opacity-60'
                }`}
              >
                {word.text}
                {isCurrent && gameStatus === 'playing' && (
                  <span className="typing-cursor"></span>
                )}
              </span>
            );
          })}
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="opacity-0 absolute pointer-events-none"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {/* Current Input Display */}
        {currentInput && (
          <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className={`text-xl ${language === 'tamil' ? 'tamil-font' : ''} ${
              currentWord && currentWord.text.startsWith(currentInput)
                ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                : theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}>
              {currentInput}
            </div>
          </div>
        )}
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-xl p-4 text-center shadow-lg`}>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            {stats.correctWords}
          </div>
          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Correct Words
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-xl p-4 text-center shadow-lg`}>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
            {stats.wrongWords}
          </div>
          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Wrong Words
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-xl p-4 text-center shadow-lg`}>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            {stats.correctKeystrokes}
          </div>
          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Correct Keys
          </div>
        </div>
        <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-xl p-4 text-center shadow-lg`}>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {Math.round((stats.correctKeystrokes / (stats.correctKeystrokes + stats.incorrectKeystrokes) || 0) * 100)}%
          </div>
          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Accuracy
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== VIRTUAL KEYBOARD COMPONENT ====================
const VirtualKeyboard = () => {
  const { theme, language, activeKey, shiftPressed } = useApp();

  if (language !== 'tamil') return null;

  const keyboardRows = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\\'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 slide-up">
      <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-2xl p-4 shadow-2xl`}>
        {/* Shift Indicator */}
        <div className="flex justify-between items-center mb-3 px-2">
          <span className={`text-xs font-medium tamil-font ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            மருதம் விசைப்பலகை
          </span>
          <div className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
            shiftPressed
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : theme === 'dark'
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {shiftPressed ? '⇧ Shift Active' : 'Shift Inactive'}
          </div>
        </div>

        {/* Keyboard Rows */}
        <div className="space-y-2">
          {keyboardRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-1"
              style={{ paddingLeft: `${rowIndex * 20}px` }}
            >
              {row.map((key) => {
                const mapping = MARUTHAM_LAYOUT[key];
                if (!mapping) return null;
                
                const displayChar = shiftPressed ? mapping.shifted : mapping.normal;
                const isActive = activeKey === key;

                return (
                  <div
                    key={key}
                    className={`min-w-[3rem] h-12 rounded-lg flex flex-col items-center justify-center tamil-font text-lg font-semibold transition-smooth ${
                      isActive
                        ? 'bg-gradient-to-b from-blue-400 to-blue-500 text-white scale-95 shadow-inner'
                        : theme === 'dark'
                        ? 'bg-gradient-to-b from-gray-700 to-gray-800 text-gray-100 hover:scale-105'
                        : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 hover:scale-105'
                    } border-2 ${
                      isActive
                        ? 'border-blue-600'
                        : theme === 'dark'
                        ? 'border-gray-600'
                        : 'border-gray-300'
                    } shadow-md`}
                  >
                    <span className="text-xl leading-none">{displayChar}</span>
                    <span className={`text-[9px] uppercase font-mono mt-0.5 ${
                      isActive ? 'text-blue-100' : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {key}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Spacebar */}
          <div className="flex justify-center pt-1">
            <div className={`w-96 h-12 rounded-lg flex items-center justify-center font-semibold transition-smooth ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-gray-700 to-gray-800 text-gray-100 hover:scale-105'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 hover:scale-105'
            } border-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} shadow-md`}>
              Space
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className={`mt-3 pt-3 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
          <p className={`text-xs text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Press <kbd className={`px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>Shift</kbd> to type secondary characters
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== RESULTS MODAL COMPONENT ====================
const ResultsModal = () => {
  const {
    theme,
    showResults,
    setShowResults,
    stats,
    timerDuration,
    timeRemaining,
    setGameStatus,
    setCurrentInput,
    setCurrentWordIndex,
    setStats,
    setWords,
    language,
    setTimeRemaining
  } = useApp();

  if (!showResults) return null;

  const timeElapsed = timerDuration - timeRemaining;
  const wpm = Math.round((stats.correctKeystrokes / 5) / (timeElapsed / 60));
  const accuracy = Math.round((stats.correctKeystrokes / (stats.correctKeystrokes + stats.incorrectKeystrokes) || 0) * 100);
  const totalKeystrokes = stats.correctKeystrokes + stats.incorrectKeystrokes;

  const handleRetry = () => {
    setShowResults(false);
    setGameStatus('idle');
    setCurrentInput('');
    setCurrentWordIndex(0);
    setStats({
      correctKeystrokes: 0,
      incorrectKeystrokes: 0,
      correctWords: 0,
      wrongWords: 0
    });
    setTimeRemaining(timerDuration);
    const newWords = generateWords(language);
    setWords(newWords);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${theme === 'dark' ? 'glass-dark' : 'glass-light'} rounded-3xl p-8 max-w-2xl w-full shadow-2xl slide-up`}>
        {/* WPM Display */}
        <div className="text-center mb-8">
          <div className={`text-7xl font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            {wpm}
          </div>
          <div className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Words Per Minute
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Keystrokes */}
          <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} rounded-2xl p-6 text-center`}>
            <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Keystrokes
            </div>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              {totalKeystrokes}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              <span className="text-green-500">{stats.correctKeystrokes}</span> | <span className="text-red-500">{stats.incorrectKeystrokes}</span>
            </div>
          </div>

          {/* Accuracy */}
          <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} rounded-2xl p-6 text-center`}>
            <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Accuracy
            </div>
            <div className={`text-3xl font-bold mb-1 ${
              accuracy >= 90 ? 'text-green-500' : accuracy >= 70 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {accuracy}%
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  accuracy >= 90 ? 'bg-green-500' : accuracy >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Word Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'} rounded-xl p-4 flex items-center justify-between`}>
            <span className={`font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
              ✓ Correct Words
            </span>
            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
              {stats.correctWords}
            </span>
          </div>
          <div className={`${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-100'} rounded-xl p-4 flex items-center justify-between`}>
            <span className={`font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
              ✗ Wrong Words
            </span>
            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
              {stats.wrongWords}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleRetry}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-smooth ${
              theme === 'dark'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } shadow-lg hover:scale-105`}
          >
            🔄 Retry
          </button>
          <button
            onClick={() => setShowResults(false)}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-smooth ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            } shadow-lg hover:scale-105`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== FOOTER COMPONENT ====================
const Footer = () => {
  const { theme } = useApp();

  return (
    <footer className={`py-6 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      <p className="text-sm">
        © 2025 ZenType Tamil • v1.0 • Made with ♥ for Tamil learners
      </p>
    </footer>
  );
};

// ==================== MAIN APP COMPONENT ====================
const App = () => {
  const { theme } = useApp();

  return (
    <div className={`min-h-screen transition-smooth ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'
    }`}>
      <Header />
      <ControlPanel />
      <TypingEngine />
      <VirtualKeyboard />
      <ResultsModal />
      <Footer />
    </div>
  );
};

// ==================== RENDER APP ====================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
