import { useMemo } from 'react';

// Finger color mapping - More vibrant, premium colors with better contrast
const FINGER_COLORS = {
    'left-pinky': { bg: '#fecaca', dark: '#991b1b' },      // Red tones
    'left-ring': { bg: '#fed7aa', dark: '#9a3412' },       // Orange tones
    'left-middle': { bg: '#fef08a', dark: '#854d0e' },     // Yellow tones
    'left-index': { bg: '#bbf7d0', dark: '#166534' },      // Green tones
    'right-index': { bg: '#bfdbfe', dark: '#1e40af' },     // Blue tones
    'right-middle': { bg: '#e9d5ff', dark: '#6b21a8' },    // Purple tones
    'right-ring': { bg: '#fbcfe8', dark: '#9d174d' },      // Pink tones
    'right-pinky': { bg: '#cbd5e1', dark: '#334155' },     // Slate tones
    'thumb': { bg: '#d6d3d1', dark: '#44403c' }            // Stone tones
};

// English QWERTY layout with finger assignments and shifted characters
const ENGLISH_LAYOUT = [
    [
        { key: '`', shifted: '~', finger: 'left-pinky' },
        { key: '1', shifted: '!', finger: 'left-pinky' },
        { key: '2', shifted: '@', finger: 'left-ring' },
        { key: '3', shifted: '#', finger: 'left-middle' },
        { key: '4', shifted: '$', finger: 'left-index' },
        { key: '5', shifted: '%', finger: 'left-index' },
        { key: '6', shifted: '^', finger: 'right-index' },
        { key: '7', shifted: '&', finger: 'right-index' },
        { key: '8', shifted: '*', finger: 'right-middle' },
        { key: '9', shifted: '(', finger: 'right-ring' },
        { key: '0', shifted: ')', finger: 'right-pinky' },
        { key: '-', shifted: '_', finger: 'right-pinky' },
        { key: '=', shifted: '+', finger: 'right-pinky' },
    ],
    [
        { key: 'q', shifted: 'Q', finger: 'left-pinky' },
        { key: 'w', shifted: 'W', finger: 'left-ring' },
        { key: 'e', shifted: 'E', finger: 'left-middle' },
        { key: 'r', shifted: 'R', finger: 'left-index' },
        { key: 't', shifted: 'T', finger: 'left-index' },
        { key: 'y', shifted: 'Y', finger: 'right-index' },
        { key: 'u', shifted: 'U', finger: 'right-index' },
        { key: 'i', shifted: 'I', finger: 'right-middle' },
        { key: 'o', shifted: 'O', finger: 'right-ring' },
        { key: 'p', shifted: 'P', finger: 'right-pinky' },
        { key: '[', shifted: '{', finger: 'right-pinky' },
        { key: ']', shifted: '}', finger: 'right-pinky' },
    ],
    [
        { key: 'a', shifted: 'A', finger: 'left-pinky', home: true },
        { key: 's', shifted: 'S', finger: 'left-ring', home: true },
        { key: 'd', shifted: 'D', finger: 'left-middle', home: true },
        { key: 'f', shifted: 'F', finger: 'left-index', home: true },
        { key: 'g', shifted: 'G', finger: 'left-index' },
        { key: 'h', shifted: 'H', finger: 'right-index' },
        { key: 'j', shifted: 'J', finger: 'right-index', home: true },
        { key: 'k', shifted: 'K', finger: 'right-middle', home: true },
        { key: 'l', shifted: 'L', finger: 'right-ring', home: true },
        { key: ';', shifted: ':', finger: 'right-pinky', home: true },
        { key: "'", shifted: '"', finger: 'right-pinky' },
    ],
    [
        { key: 'z', shifted: 'Z', finger: 'left-pinky' },
        { key: 'x', shifted: 'X', finger: 'left-ring' },
        { key: 'c', shifted: 'C', finger: 'left-middle' },
        { key: 'v', shifted: 'V', finger: 'left-index' },
        { key: 'b', shifted: 'B', finger: 'left-index' },
        { key: 'n', shifted: 'N', finger: 'right-index' },
        { key: 'm', shifted: 'M', finger: 'right-index' },
        { key: ',', shifted: '<', finger: 'right-middle' },
        { key: '.', shifted: '>', finger: 'right-ring' },
        { key: '/', shifted: '?', finger: 'right-pinky' },
    ],
    [
        { key: 'Space', shifted: '', finger: 'thumb', wide: true }
    ]
];

// Tamil Marutham layout with finger assignments, shifted characters, and English key mapping
const TAMIL_LAYOUT = [
    [
        { key: 'ஃ', shifted: '*', finger: 'left-pinky', engKey: '`' },
        { key: '1', shifted: 'ஸ', finger: 'left-pinky', engKey: '1' },
        { key: '2', shifted: '"', finger: 'left-ring', engKey: '2' },
        { key: '3', shifted: '#', finger: 'left-middle', engKey: '3' },
        { key: '4', shifted: 'ஐ', finger: 'left-index', engKey: '4' },
        { key: '5', shifted: '%', finger: 'left-index', engKey: '5' },
        { key: '6', shifted: '^', finger: 'right-index', engKey: '6' },
        { key: '7', shifted: 'ஷ', finger: 'right-index', engKey: '7' },
        { key: '8', shifted: '*', finger: 'right-middle', engKey: '8' },
        { key: '9', shifted: '(', finger: 'right-ring', engKey: '9' },
        { key: '0', shifted: ')', finger: 'right-pinky', engKey: '0' },
        { key: '/', shifted: 'ஶ்ரீ', finger: 'right-pinky', engKey: '-' },
        { key: '=', shifted: 'ஹ', finger: 'right-pinky', engKey: '=' },
    ],
    [
        { key: 'ணு', shifted: 'ன', finger: 'left-pinky', engKey: 'q' },
        { key: 'ற', shifted: 'று', finger: 'left-ring', engKey: 'w' },
        { key: 'ந', shifted: 'நு', finger: 'left-middle', engKey: 'e' },
        { key: 'ச', shifted: 'சு', finger: 'left-index', engKey: 'r' },
        { key: 'வ', shifted: 'கூ', finger: 'left-index', engKey: 't' },
        { key: 'ல', shifted: 'லு', finger: 'right-index', engKey: 'y' },
        { key: 'ர', shifted: 'ரு', finger: 'right-index', engKey: 'u' },
        { key: 'ை', shifted: 'ஐ', finger: 'right-middle', engKey: 'i' },
        { key: 'டி', shifted: 'டீ', finger: 'right-ring', engKey: 'o' },
        { key: 'ி', shifted: 'ீ', finger: 'right-pinky', engKey: 'p' },
        { key: 'ு', shifted: 'ூ', finger: 'right-pinky', engKey: '[' },
        { key: ',', shifted: 'ீ', finger: 'right-pinky', engKey: ']' },
    ],
    [
        { key: 'ய', shifted: '', finger: 'left-pinky', home: true, engKey: 'a' },
        { key: 'ள', shifted: 'ளு', finger: 'left-ring', home: true, engKey: 's' },
        { key: 'ன', shifted: 'னு', finger: 'left-middle', home: true, engKey: 'd' },
        { key: 'க', shifted: 'கு', finger: 'left-index', home: true, engKey: 'f' },
        { key: 'ப', shifted: 'ழு', finger: 'left-index', engKey: 'g' },
        { key: 'ா', shifted: 'ழ', finger: 'right-index', engKey: 'h' },
        { key: 'த', shifted: 'து', finger: 'right-index', home: true, engKey: 'j' },
        { key: 'ம', shifted: 'மு', finger: 'right-middle', home: true, engKey: 'k' },
        { key: 'ட', shifted: 'டு', finger: 'right-ring', home: true, engKey: 'l' },
        { key: '்', shifted: '', finger: 'right-pinky', home: true, engKey: ';' },
        { key: 'ங', shifted: 'ஞ', finger: 'right-pinky', engKey: "'" },
    ],
    [
        { key: 'ண', shifted: 'ூ', finger: 'left-pinky', engKey: 'z' },
        { key: 'ஒ', shifted: 'ஓ', finger: 'left-ring', engKey: 'x' },
        { key: 'உ', shifted: 'ஊ', finger: 'left-middle', engKey: 'c' },
        { key: 'எ', shifted: 'ஏ', finger: 'left-index', engKey: 'v' },
        { key: 'ெ', shifted: 'க்ஷ', finger: 'left-index', engKey: 'b' },
        { key: 'ே', shifted: 'சூ', finger: 'right-index', engKey: 'n' },
        { key: 'அ', shifted: 'ஆ', finger: 'right-index', engKey: 'm' },
        { key: 'இ', shifted: 'ஈ', finger: 'right-middle', engKey: ',' },
        { key: '.', shifted: '?', finger: 'right-ring', engKey: '.' },
    ],
    [
        { key: 'Space', shifted: '', finger: 'thumb', wide: true, engKey: ' ' }
    ]
];

function VisualKeyboard({ language, nextChar, pressedKey, theme }) {
    const layout = language === 'tamil' ? TAMIL_LAYOUT : ENGLISH_LAYOUT;
    const isDark = theme === 'dark';

    // Determine which key should be highlighted (next to press)
    const highlightedKey = useMemo(() => {
        if (!nextChar) return null;

        // Normalize the character for comparison
        const char = nextChar.normalize('NFC');

        // Find the key in the layout
        for (const row of layout) {
            for (const keyObj of row) {
                // Check normal key
                if (keyObj.key === char || keyObj.key.toLowerCase() === char.toLowerCase()) {
                    return keyObj.key;
                }
                // Check shifted key
                if (keyObj.shifted === char || keyObj.shifted?.toLowerCase() === char.toLowerCase()) {
                    return keyObj.key;
                }
                // Check if key starts with char (for multi-char Tamil keys)
                if (keyObj.key.startsWith(char) || char.startsWith(keyObj.key)) {
                    return keyObj.key;
                }
                // Space handling
                if (keyObj.key === 'Space' && char === ' ') {
                    return keyObj.key;
                }
            }
        }
        return null;
    }, [nextChar, layout]);

    // Check if a key is pressed - for Tamil, match against engKey
    const isKeyPressed = (keyObj) => {
        if (!pressedKey) return false;
        const pressedLower = pressedKey.toLowerCase();

        // For Tamil layout, use engKey to match the English key pressed
        if (keyObj.engKey) {
            return keyObj.engKey.toLowerCase() === pressedLower ||
                (keyObj.key === 'Space' && pressedKey === 'Space');
        }

        // For English layout, match directly
        const keyLower = keyObj.key.toLowerCase();
        return keyLower === pressedLower ||
            (keyObj.key === 'Space' && pressedKey === 'Space');
    };

    // Determine key state: 'correct', 'wrong', 'expected', or null
    const getKeyState = (keyObj) => {
        const isExpected = keyObj.key === highlightedKey;
        const isPressed = isKeyPressed(keyObj);

        if (isPressed && isExpected) {
            return 'correct'; // Green - pressed the right key
        } else if (isPressed && !isExpected) {
            return 'wrong'; // Red - pressed wrong key
        } else if (isExpected && pressedKey && !isPressed) {
            return 'expected'; // Blue - this was expected but user pressed wrong
        } else if (isExpected) {
            return 'expected'; // Blue - this should be pressed next
        }
        return null;
    };

    // Get background color based on state
    const getKeyBackground = (keyState, fingerColor) => {
        switch (keyState) {
            case 'correct':
                return isDark ? '#22c55e' : '#4ade80'; // Green
            case 'wrong':
                return isDark ? '#dc2626' : '#f87171'; // Red
            case 'expected':
                return isDark ? '#2563eb' : '#60a5fa'; // Blue
            default:
                return isDark ? fingerColor.dark : fingerColor.bg;
        }
    };

    // Get border color based on state
    const getKeyBorder = (keyState) => {
        switch (keyState) {
            case 'correct':
                return '#16a34a';
            case 'wrong':
                return '#b91c1c';
            case 'expected':
                return '#1d4ed8';
            default:
                return 'transparent';
        }
    };

    // Get box shadow based on state
    const getKeyShadow = (keyState) => {
        if (keyState === 'correct' || keyState === 'wrong') {
            return 'inset 0 2px 4px rgba(0,0,0,0.3)';
        } else if (keyState === 'expected') {
            return '0 4px 20px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)';
        }
        return isDark
            ? 'inset 0 -2px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            : 'inset 0 -2px 0 rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)';
    };

    return (
        <div className="visual-keyboard premium">
            {layout.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((keyObj, keyIndex) => {
                        const keyState = getKeyState(keyObj);
                        const isHome = keyObj.home;
                        const fingerColor = FINGER_COLORS[keyObj.finger];
                        const hasShifted = keyObj.shifted && keyObj.shifted !== keyObj.key;

                        return (
                            <div
                                key={keyIndex}
                                className={`keyboard-key ${keyObj.wide ? 'wide' : ''} ${keyState ? keyState : ''} ${isHome ? 'home-key' : ''} ${hasShifted ? 'has-shift' : ''}`}
                                style={{
                                    backgroundColor: getKeyBackground(keyState, fingerColor),
                                    borderColor: getKeyBorder(keyState),
                                    boxShadow: getKeyShadow(keyState)
                                }}
                                data-finger={keyObj.finger}
                            >
                                {hasShifted && (
                                    <span
                                        className="key-shifted"
                                        style={{ color: keyState ? '#ffffff' : (isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.6)') }}
                                    >
                                        {keyObj.shifted}
                                    </span>
                                )}
                                <span
                                    className="key-label"
                                    style={{ color: keyState ? '#ffffff' : (isDark ? '#ffffff' : '#000000') }}
                                >
                                    {keyObj.key}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Finger Guide */}
            <div className="finger-guide">
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['left-pinky'].dark : FINGER_COLORS['left-pinky'].bg }}></span>
                    <span className="finger-label">L. Pinky</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['left-ring'].dark : FINGER_COLORS['left-ring'].bg }}></span>
                    <span className="finger-label">L. Ring</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['left-middle'].dark : FINGER_COLORS['left-middle'].bg }}></span>
                    <span className="finger-label">L. Middle</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['left-index'].dark : FINGER_COLORS['left-index'].bg }}></span>
                    <span className="finger-label">L. Index</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['right-index'].dark : FINGER_COLORS['right-index'].bg }}></span>
                    <span className="finger-label">R. Index</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['right-middle'].dark : FINGER_COLORS['right-middle'].bg }}></span>
                    <span className="finger-label">R. Middle</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['right-ring'].dark : FINGER_COLORS['right-ring'].bg }}></span>
                    <span className="finger-label">R. Ring</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: isDark ? FINGER_COLORS['right-pinky'].dark : FINGER_COLORS['right-pinky'].bg }}></span>
                    <span className="finger-label">R. Pinky</span>
                </div>
            </div>
        </div>
    );
}

export default VisualKeyboard;
