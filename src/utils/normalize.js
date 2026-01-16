/**
 * Unicode normalization utilities for Tamil character comparison
 * Tamil characters can be represented in multiple Unicode sequences
 * NFC (Canonical Composition) ensures consistent comparison
 */

/**
 * Compare two words with Unicode normalization
 * @param {string} typed - The word typed by the user
 * @param {string} expected - The expected word
 * @returns {boolean} - True if words match after normalization
 */
export const compareWords = (typed, expected) => {
    // Normalize to NFC (Canonical Composition)
    const normalizedTyped = typed.trim().normalize('NFC');
    const normalizedExpected = expected.normalize('NFC');

    return normalizedTyped === normalizedExpected;
};

/**
 * Format time in MM:SS format
 * @param {number} totalSeconds - Total seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Calculate typing metrics
 * @param {Object} data - Typing data
 * @returns {Object} - Calculated metrics
 */
export const calculateMetrics = ({
    correctKeystrokes,
    wrongKeystrokes,
    correctWords,
    wrongWords,
    totalTimeInSeconds
}) => {
    const totalKeystrokes = correctKeystrokes + wrongKeystrokes;
    const accuracy = totalKeystrokes > 0
        ? ((correctKeystrokes / totalKeystrokes) * 100).toFixed(2)
        : 0;

    const totalMinutes = totalTimeInSeconds / 60;
    const wpm = totalMinutes > 0
        ? Math.round((correctKeystrokes / 5) / totalMinutes)
        : 0;

    return {
        wpm,
        correctKeystrokes,
        wrongKeystrokes,
        totalKeystrokes,
        accuracy,
        correctWords,
        wrongWords
    };
};
