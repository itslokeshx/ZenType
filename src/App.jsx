import { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import { englishWords } from './data/englishWords';
import { tamilWords } from './data/tamilWords';
import { compareWords, formatTime, calculateMetrics } from './utils/normalize';
import { convertToTamil } from './utils/maruthamLayout';
import LearningPage from './components/LearningPage';

function App() {
  // Page Navigation
  const [currentPage, setCurrentPage] = useState('practice'); // 'practice' | 'learning'

  // Language & Theme
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'english';
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Timer
  const [minutes, setMinutes] = useState(() => {
    return parseInt(localStorage.getItem('timerMinutes') || '1');
  });
  const [seconds, setSeconds] = useState(() => {
    return parseInt(localStorage.getItem('timerSeconds') || '0');
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Words & Input
  const wordList = useMemo(() => {
    return language === 'tamil' ? tamilWords : englishWords;
  }, [language]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordStatuses, setWordStatuses] = useState(
    wordList.map(() => 'pending')
  );
  const [inputValue, setInputValue] = useState('');

  // Metrics
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [wrongKeystrokes, setWrongKeystrokes] = useState(0);

  // UI State
  const [showResults, setShowResults] = useState(false);
  const [inputStatus, setInputStatus] = useState(''); // 'correct' | 'wrong' | ''

  // Refs
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Apply theme on mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save timer settings
  useEffect(() => {
    localStorage.setItem('timerMinutes', minutes.toString());
    localStorage.setItem('timerSeconds', seconds.toString());
  }, [minutes, seconds]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset word statuses when language changes
  useEffect(() => {
    setWordStatuses(wordList.map(() => 'pending'));
  }, [wordList]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLanguageSwitch = (newLang) => {
    // Reset everything
    setLanguage(newLang);
    setCurrentWordIndex(0);
    setInputValue('');
    setCorrectWords(0);
    setWrongWords(0);
    setCorrectKeystrokes(0);
    setWrongKeystrokes(0);
    setIsRunning(false);
    setHasStarted(false);
    setShowResults(false);
    setTimeLeft(minutes * 60 + seconds);

    // Save preference
    localStorage.setItem('preferredLanguage', newLang);

    // Focus input
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds <= 0) {
      alert('Please set a valid time');
      return;
    }
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setHasStarted(true);
    startTimeRef.current = Date.now();
    inputRef.current?.focus();
  };

  const handleStop = () => {
    setIsRunning(false);
    handleTimerEnd();
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(minutes * 60 + seconds);
    setCurrentWordIndex(0);
    setInputValue('');
    setWordStatuses(wordList.map(() => 'pending'));
    setCorrectWords(0);
    setWrongWords(0);
    setCorrectKeystrokes(0);
    setWrongKeystrokes(0);
    setShowResults(false);
    inputRef.current?.focus();
  };

  const handleTimerEnd = () => {
    setIsRunning(false);
    setShowResults(true);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Mobile Space Handling: If space is the last char, submit word
    if (value.endsWith(' ')) {
      // Remove the space
      const pendingValue = value.slice(0, -1);

      // Update input with the value before space
      setInputValue(pendingValue);

      // Since state update is async, we need to manually trigger submit logic with current values
      setTimeout(() => {
        handleWordSubmit(pendingValue); // Pass the value directly to ensure sync
      }, 0);
      return;
    }

    // Mobile Fallback: Handle Tamil conversion if KeyDown didn't catch it
    if (language === 'tamil' && value.length > inputValue.length) {
      const lastChar = value.slice(-1);
      if (/^[a-zA-Z0-9`\-=\[\]\\;',./~!@#$%^&*()_+{}|:"<>?]*$/.test(lastChar)) {
        const isShifted = lastChar !== lastChar.toLowerCase() ||
          ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'].includes(lastChar);

        const converted = convertToTamil(lastChar, isShifted);
        if (converted !== lastChar) {
          value = value.slice(0, -1) + converted;
        }
      }
    }

    setInputValue(value);

    // Auto-Submit Logic
    if (currentWordIndex < wordList.length) {
      const currentWord = wordList[currentWordIndex];
      const normalizedValue = value.normalize('NFC');
      const normalizedWord = currentWord.normalize('NFC');

      // Check if correct
      if (normalizedWord.startsWith(normalizedValue)) {
        setInputStatus('correct');

        // If fully matches correct word, submit immediately
        if (normalizedValue === normalizedWord) {
          // We need to use valid-check here
          handleWordSubmit(value);
          return;
        }
      } else {
        setInputStatus('wrong');
      }
    } else {
      setInputStatus('');
    }

    // Start timer on first keystroke
    if (!hasStarted && value.length > 0) {
      handleStart();
    }
  };

  const handleKeyDown = (e) => {
    // Handle Space or Enter to submit word
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleWordSubmit();
      return;
    }

    // If Tamil mode, intercept key and convert using Marutham layout
    if (language === 'tamil') {
      // Handle backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        setInputValue(inputValue.slice(0, -1));
        return;
      }

      // Allow other special keys (arrow keys, etc.) except Shift
      if (e.key.length > 1 && e.key !== 'Shift') {
        return;
      }

      // Ignore standalone Shift key press
      if (e.key === 'Shift') {
        return;
      }

      // For regular character keys
      if (e.key.length === 1) {
        e.preventDefault();
        const tamilChar = convertToTamil(e.key, e.shiftKey);
        const newValue = inputValue + tamilChar;
        setInputValue(newValue);

        // Start timer on first keystroke
        if (!hasStarted && newValue.length === 1) {
          handleStart();
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const handleWordSubmit = (overrideValue = null) => {
    const valueToCheck = overrideValue !== null ? overrideValue : inputValue;

    // Safety check - empty or out of bounds
    if ((!valueToCheck && valueToCheck !== '') || currentWordIndex >= wordList.length) return;

    // Don't submit empty strings unless it's a forced skip (future feature?)
    if (!valueToCheck.trim()) return;

    const currentWord = wordList[currentWordIndex];
    const isCorrect = compareWords(valueToCheck, currentWord);

    // Update metrics
    if (isCorrect) {
      setCorrectWords((prev) => prev + 1);
      setCorrectKeystrokes((prev) => prev + valueToCheck.length);
    } else {
      setWrongWords((prev) => prev + 1);
      setWrongKeystrokes((prev) => prev + valueToCheck.length);
    }

    // Update word status
    const newStatuses = [...wordStatuses];
    newStatuses[currentWordIndex] = isCorrect ? 'correct' : 'wrong';
    setWordStatuses(newStatuses);

    // Clear input and move to next word
    setInputValue('');
    setInputStatus('');
    setCurrentWordIndex((prev) => prev + 1);

    // Check if all words are done
    if (currentWordIndex + 1 >= wordList.length) {
      setTimeout(() => {
        handleTimerEnd();
      }, 200);
    }
  };

  const handleTryAgain = () => {
    handleReset();
  };

  const results = useMemo(() => {
    const totalTimeInSeconds = (minutes * 60 + seconds) - timeLeft;
    return calculateMetrics({
      correctKeystrokes,
      wrongKeystrokes,
      correctWords,
      wrongWords,
      totalTimeInSeconds: totalTimeInSeconds > 0 ? totalTimeInSeconds : 1,
    });
  }, [correctKeystrokes, wrongKeystrokes, correctWords, wrongWords, minutes, seconds, timeLeft]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">ZenType</div>
        <div className="header-nav">
          <button
            className={`nav-btn ${currentPage === 'practice' ? 'active' : ''}`}
            onClick={() => setCurrentPage('practice')}
          >
            {language === 'tamil' ? 'பயிற்சி' : 'Practice'}
          </button>
          <button
            className={`nav-btn ${currentPage === 'learning' ? 'active' : ''}`}
            onClick={() => setCurrentPage('learning')}
          >
            {language === 'tamil' ? 'கற்றல்' : 'Learning'}
          </button>
        </div>
        <div className="header-controls">
          <div className="language-toggle">
            <button
              className={`language-btn ${language === 'english' ? 'active' : ''}`}
              onClick={() => handleLanguageSwitch('english')}
              disabled={hasStarted && currentPage === 'practice'}
            >
              EN
            </button>
            <button
              className={`language-btn ${language === 'tamil' ? 'active' : ''}`}
              onClick={() => handleLanguageSwitch('tamil')}
              disabled={hasStarted && currentPage === 'practice'}
            >
              தமிழ்
            </button>
          </div>
          <button className="theme-toggle" onClick={handleThemeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      {currentPage === 'learning' ? (
        <LearningPage
          language={language}
          theme={theme}
          onBackToPractice={() => setCurrentPage('practice')}
        />
      ) : (
        <main className="main-content">
          <div className="typing-container">
            {/* Left Side - Words & Input */}
            <div className="words-input-section">
              {/* Word Display - 2 Lines Max */}
              <div className="word-display-container" data-lang={language}>
                <div className="word-display" data-lang={language}>
                  {wordList.slice(currentWordIndex, currentWordIndex + 15).map((word, index) => {
                    const globalIndex = currentWordIndex + index;
                    const status = wordStatuses[globalIndex];
                    if (status === 'correct' || status === 'wrong') {
                      return null;
                    }
                    return (
                      <span
                        key={globalIndex}
                        className={`word ${index === 0 ? 'active' : ''} ${status}`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Input Box */}
              <div className="input-container">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="text"
                  className={`input-box ${inputStatus}`}
                  data-lang={language}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder={language === 'tamil' ? 'இங்கே தட்டச்சு செய்யவும்...' : 'Type here...'}
                  disabled={showResults}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-gramm="false"
                  data-gramm_editor="false"
                  data-enable-grammarly="false"
                />
              </div>
              {/* Inline Results Display */}
              {showResults && (
                <div className="inline-results slide-up">
                  <div className="results-header">
                    <h2 className="results-title">Test Complete!</h2>
                    <div className="results-summary">
                      <div className="result-metric">
                        <span className="metric-label">WPM</span>
                        <span className="metric-value highlight">{results.wpm}</span>
                      </div>
                      <div className="result-metric">
                        <span className="metric-label">Accuracy</span>
                        <span className="metric-value">{results.accuracy}%</span>
                      </div>
                      <div className="result-metric">
                        <span className="metric-label">Keystrokes</span>
                        <span className="metric-value">
                          {results.totalKeystrokes}
                          <span className="metric-sub">
                            (<span className="correct">{results.correctKeystrokes}</span> | <span className="wrong">{results.wrongKeystrokes}</span>)
                          </span>
                        </span>
                      </div>
                      <div className="result-metric">
                        <span className="metric-label">Words</span>
                        <span className="metric-value">
                          <span className="correct">{results.correctWords}</span> / <span className="wrong">{results.wrongWords}</span>
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-primary retry-btn" onClick={handleTryAgain}>
                      🔄 Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Timer & Stats */}
            <div className="timer-stats-section">
              {/* Timer Display */}
              <div className="timer-display">
                <div className="timer-label">Timer</div>
                {!hasStarted ? (
                  <div className="timer-inputs">
                    <input
                      type="number"
                      className="timer-input"
                      value={minutes}
                      onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      min="0"
                      max="59"
                      disabled={hasStarted}
                    />
                    <span className="timer-separator">:</span>
                    <input
                      type="number"
                      className="timer-input"
                      value={seconds}
                      onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      min="0"
                      max="59"
                      disabled={hasStarted}
                    />
                  </div>
                ) : (
                  <div className="timer-time-display">{formatTime(timeLeft)}</div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="timer-buttons">
                {!hasStarted ? (
                  <button className="btn btn-primary" onClick={handleStart}>
                    ▶ Start
                  </button>
                ) : (
                  <>
                    <button className="btn btn-secondary" onClick={handleStop}>
                      ⏹ Stop
                    </button>
                    <button className="btn btn-secondary" onClick={handleReset}>
                      🔄 Reset
                    </button>
                  </>
                )}
              </div>

              {/* Stats Display - Simple during typing */}
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Correct</div>
                  <div className="stat-value success">{correctWords}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Wrong</div>
                  <div className="stat-value error">{wrongWords}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

    </div>
  );
}

export default App;
