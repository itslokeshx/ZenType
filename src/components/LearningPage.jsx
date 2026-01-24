import { useState, useEffect, useRef } from 'react';
import { englishExercises } from '../data/englishExercises';
import { tamilExercises } from '../data/tamilExercises';
import { convertToTamil, getTamilKeyMapping } from '../utils/maruthamLayout';
import { compareWords } from '../utils/normalize';
import {
    ArrowLeft,
    Keyboard,
    Check,
    Lock,
    Circle,
    RotateCcw,
    ArrowRight,
    Play
} from 'lucide-react';
import VisualKeyboard from './VisualKeyboard';

function LearningPage({ language, theme, onBackToPractice }) {
    const exercises = language === 'tamil' ? tamilExercises : englishExercises;

    // Load progress from localStorage
    const loadProgress = () => {
        const saved = localStorage.getItem('learningProgress');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            english: { currentExercise: 1, completedExercises: [], exerciseScores: {} },
            tamil: { currentExercise: 1, completedExercises: [], exerciseScores: {} }
        };
    };

    const [progress, setProgress] = useState(loadProgress());
    const [currentExerciseId, setCurrentExerciseId] = useState(
        progress[language].currentExercise
    );
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [charStatuses, setCharStatuses] = useState([]);
    const [correctChars, setCorrectChars] = useState(0);
    const [totalChars, setTotalChars] = useState(0);
    const [showKeyboard, setShowKeyboard] = useState(true);
    const [exerciseComplete, setExerciseComplete] = useState(false);

    const processingRef = useRef(false);
    const inputRef = useRef(null);
    const [pressedKey, setPressedKey] = useState(null);
    const [lastExpectedChar, setLastExpectedChar] = useState(null);

    const currentExercise = exercises.find(ex => ex.id === currentExerciseId);
    const currentLine = currentExercise?.targetLines[currentLineIndex] || '';

    // Save progress to localStorage
    useEffect(() => {
        localStorage.setItem('learningProgress', JSON.stringify(progress));
    }, [progress]);

    // Reset processing ref when exercise or line changes
    useEffect(() => {
        processingRef.current = false;
        inputRef.current?.focus();
    }, [currentExerciseId, currentLineIndex]);

    // Calculate character statuses
    useEffect(() => {
        const statuses = [];
        for (let i = 0; i < currentLine.length; i++) {
            if (i < inputValue.length) {
                const typed = inputValue[i];
                const expected = currentLine[i];
                statuses.push(typed === expected ? 'correct' : 'wrong');
            } else {
                statuses.push(i === inputValue.length ? 'current' : 'pending');
            }
        }
        setCharStatuses(statuses);
    }, [inputValue, currentLine]);

    // Check for line completion - works for both English and Tamil
    useEffect(() => {
        if (processingRef.current) return;
        if (!currentLine || inputValue.length !== currentLine.length) return;

        processingRef.current = true;

        // Count correct characters
        let correct = 0;
        for (let i = 0; i < inputValue.length; i++) {
            if (inputValue[i] === currentLine[i]) correct++;
        }

        setCorrectChars(prev => prev + correct);
        setTotalChars(prev => prev + currentLine.length);

        // Move to next line after a short delay
        setTimeout(() => {
            if (currentLineIndex < currentExercise.targetLines.length - 1) {
                setCurrentLineIndex(prev => prev + 1);
                setInputValue('');
            } else {
                // Exercise complete
                handleExerciseComplete();
            }
        }, 300);
    }, [inputValue, currentLine]);

    const handleInputChange = (e) => {
        // If already processing completion, ignore input
        if (processingRef.current) return;

        let value = e.target.value;

        // Tamil conversion for mobile fallback
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

        // Don't allow typing beyond current line length
        if (value.length > currentLine.length) {
            return;
        }

        setInputValue(value);
    };

    const handleKeyDown = (e) => {
        // Track pressed key for visual feedback
        let displayKey = e.key;

        // Tamil mode keyboard interception
        if (language === 'tamil') {
            if (e.key === 'Backspace') {
                setPressedKey('Backspace');
                setTimeout(() => setPressedKey(null), 150);
                e.preventDefault();
                setInputValue(inputValue.slice(0, -1));
                return;
            }

            if (e.key.length > 1 && e.key !== 'Shift') {
                return;
            }

            if (e.key === 'Shift') {
                return;
            }

            if (e.key.length === 1) {
                e.preventDefault();
                const tamilChar = convertToTamil(e.key, e.shiftKey);
                displayKey = tamilChar;
                // Save what character was expected when key was pressed
                const expectedChar = currentLine[inputValue.length];
                setLastExpectedChar(expectedChar);
                setPressedKey(e.key.toLowerCase());
                setTimeout(() => {
                    setPressedKey(null);
                    setLastExpectedChar(null);
                }, 150);

                const newValue = inputValue + tamilChar;

                if (newValue.length <= currentLine.length) {
                    setInputValue(newValue);
                }
            }
        } else {
            // English mode - track key for visual feedback
            if (e.key.length === 1 || e.key === ' ') {
                // Save what character was expected when key was pressed
                const expectedChar = currentLine[inputValue.length];
                setLastExpectedChar(expectedChar);
                setPressedKey(e.key === ' ' ? 'Space' : e.key.toLowerCase());
                setTimeout(() => {
                    setPressedKey(null);
                    setLastExpectedChar(null);
                }, 150);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
    };

    const handleExerciseComplete = () => {
        const accuracy = totalChars > 0 ? ((correctChars / totalChars) * 100).toFixed(2) : 0;
        const passed = parseFloat(accuracy) >= currentExercise.requiredAccuracy;

        // Update progress
        const newProgress = { ...progress };
        const langProgress = newProgress[language];

        langProgress.exerciseScores[currentExerciseId] = {
            accuracy: parseFloat(accuracy),
            completed: passed,
            bestLine: currentExercise.targetLines.length
        };

        if (passed && !langProgress.completedExercises.includes(currentExerciseId)) {
            langProgress.completedExercises.push(currentExerciseId);
            langProgress.completedExercises.sort((a, b) => a - b);
        }

        setProgress(newProgress);
        setExerciseComplete(true);
    };

    const handleNextExercise = () => {
        const nextId = currentExerciseId + 1;
        if (canAccessExercise(nextId)) {
            setCurrentExerciseId(nextId);
            setCurrentLineIndex(0);
            setInputValue('');
            setCorrectChars(0);
            setTotalChars(0);
            setExerciseComplete(false);

            const newProgress = { ...progress };
            newProgress[language].currentExercise = nextId;
            setProgress(newProgress);
        }
    };

    const handleRestartExercise = () => {
        setCurrentLineIndex(0);
        setInputValue('');
        setCorrectChars(0);
        setTotalChars(0);
        setExerciseComplete(false);
    };

    const handleSelectExercise = (exerciseId) => {
        if (canAccessExercise(exerciseId)) {
            setCurrentExerciseId(exerciseId);
            setCurrentLineIndex(0);
            setInputValue('');
            setCorrectChars(0);
            setTotalChars(0);
            setExerciseComplete(false);

            const newProgress = { ...progress };
            newProgress[language].currentExercise = exerciseId;
            setProgress(newProgress);
        }
    };

    const canAccessExercise = (exerciseId) => {
        // All exercises are now unlocked
        return true;
    };

    const getExerciseStatus = (exerciseId) => {
        if (exerciseId === currentExerciseId) return 'current';
        if (progress[language].completedExercises.includes(exerciseId)) return 'completed';
        if (!canAccessExercise(exerciseId)) return 'locked';
        return 'available';
    };

    const currentAccuracy = totalChars > 0 ? ((correctChars / totalChars) * 100).toFixed(1) : 100;
    const progressPercent = currentExercise
        ? ((currentLineIndex / currentExercise.targetLines.length) * 100).toFixed(0)
        : 0;

    return (
        <div className="learning-page">
            {/* Header with Back Button */}
            <div className="learning-header">
                <button className="btn btn-secondary" onClick={onBackToPractice}>
                    <ArrowLeft size={18} />
                    <span>Back to Practice</span>
                </button>
                <h1 className="learning-title">
                    {language === 'tamil' ? 'கற்றல்' : 'Learning Mode'}
                </h1>
                <button
                    className="btn btn-secondary"
                    onClick={() => setShowKeyboard(!showKeyboard)}
                >
                    <Keyboard size={18} />
                    <span>{showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}</span>
                </button>
            </div>

            <div className="learning-container">
                {/* Left Panel: Exercise Menu */}
                <div className="exercise-menu">
                    <h2 className="menu-title">
                        {language === 'tamil' ? 'பயிற்சிகள்' : 'Exercises'}
                    </h2>
                    <div className="exercise-list">
                        {exercises.map((exercise) => {
                            const status = getExerciseStatus(exercise.id);
                            return (
                                <button
                                    key={exercise.id}
                                    className={`exercise-item ${status}`}
                                    onClick={() => handleSelectExercise(exercise.id)}
                                    disabled={status === 'locked'}
                                >
                                    <span className="exercise-number">{exercise.id}</span>
                                    <span className="exercise-name">{exercise.title}</span>
                                    <span className="exercise-status-icon">
                                        {status === 'completed' && <Check size={16} className="text-success" />}
                                        {status === 'current' && <Play size={16} className="text-primary" />}
                                        {status === 'locked' && <Lock size={16} className="text-muted" />}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel: Exercise Area */}
                <div className="exercise-area">
                    {!exerciseComplete ? (
                        <>
                            {/* Exercise Info */}
                            <div className="exercise-info">
                                <h2 className="exercise-title">{currentExercise?.title}</h2>
                                <p className="exercise-description">{currentExercise?.description}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="progress-section">
                                <div className="progress-stats">
                                    <span>Line {currentLineIndex + 1} of {currentExercise?.targetLines.length}</span>
                                    <span>Accuracy: {currentAccuracy}%</span>
                                    <span>Progress: {progressPercent}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                            </div>

                            {/* Target Text Display */}
                            <div className="target-text-container" data-lang={language}>
                                <div className="target-text" data-lang={language}>
                                    {currentLine.split('').map((char, index) => (
                                        <span
                                            key={index}
                                            className={`char ${charStatuses[index] || 'pending'}`}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Input Box */}
                            <div className="learning-input-container">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="learning-input"
                                    data-lang={language}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    onPaste={handlePaste}
                                    placeholder={language === 'tamil' ? 'இங்கே தட்டச்சு செய்யவும்...' : 'Type here...'}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                />
                            </div>

                            {/* Visual Keyboard */}
                            {showKeyboard && (
                                <VisualKeyboard
                                    language={language}
                                    nextChar={lastExpectedChar || currentLine[inputValue.length]}
                                    pressedKey={pressedKey}
                                    theme={theme}
                                />
                            )}

                            {/* Control Buttons */}
                            <div className="exercise-controls">
                                <button className="btn btn-secondary" onClick={handleRestartExercise}>
                                    <RotateCcw size={18} />
                                    <span>Restart Exercise</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Exercise Complete Screen */
                        <div className="exercise-complete">
                            <h2 className="complete-title">Exercise Complete!</h2>
                            <div className="complete-stats">
                                <div className="complete-stat">
                                    <span className="stat-label">Accuracy</span>
                                    <span className="stat-value">{currentAccuracy}%</span>
                                </div>
                                <div className="complete-stat">
                                    <span className="stat-label">Lines Completed</span>
                                    <span className="stat-value">{currentExercise?.targetLines.length}</span>
                                </div>
                                <div className="complete-stat">
                                    <span className="stat-label">Status</span>
                                    <span className={`stat-value ${parseFloat(currentAccuracy) >= currentExercise?.requiredAccuracy ? 'success' : 'error'}`}>
                                        {parseFloat(currentAccuracy) >= currentExercise?.requiredAccuracy ? 'Passed' : 'Try Again'}
                                    </span>
                                </div>
                            </div>
                            <p className="complete-message">
                                {parseFloat(currentAccuracy) >= currentExercise?.requiredAccuracy
                                    ? language === 'tamil'
                                        ? 'வாழ்த்துக்கள்! அடுத்த பயிற்சிக்கு செல்லலாம்.'
                                        : 'Great job! You can now move to the next exercise.'
                                    : language === 'tamil'
                                        ? 'மீண்டும் முயற்சி செய்யவும். 90% துல்லியம் தேவை.'
                                        : 'Please try again. You need 90% accuracy to unlock the next exercise.'}
                            </p>
                            <div className="complete-buttons">
                                <button className="btn btn-secondary" onClick={handleRestartExercise}>
                                    <RotateCcw size={18} />
                                    <span>Retry Exercise</span>
                                </button>
                                {parseFloat(currentAccuracy) >= currentExercise?.requiredAccuracy &&
                                    currentExerciseId < exercises.length && (
                                        <button className="btn btn-primary" onClick={handleNextExercise}>
                                            <span>Next Exercise</span>
                                            <ArrowRight size={18} />
                                        </button>
                                    )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LearningPage;
