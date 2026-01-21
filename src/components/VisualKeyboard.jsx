import { useMemo } from 'react';

// Finger color mapping
const FINGER_COLORS = {
    'left-pinky': '#ffcdd2',      // Light red
    'left-ring': '#ffe0b2',       // Light orange
    'left-middle': '#fff9c4',     // Light yellow
    'left-index': '#c8e6c9',      // Light green
    'right-index': '#bbdefb',     // Light blue
    'right-middle': '#e1bee7',    // Light purple
    'right-ring': '#f8bbd0',      // Light pink
    'right-pinky': '#e0e0e0',     // Light gray
    'thumb': '#d7ccc8'            // Light brown
};

// English QWERTY layout with finger assignments
const ENGLISH_LAYOUT = [
    [
        { key: '`', finger: 'left-pinky' },
        { key: '1', finger: 'left-pinky' },
        { key: '2', finger: 'left-ring' },
        { key: '3', finger: 'left-middle' },
        { key: '4', finger: 'left-index' },
        { key: '5', finger: 'left-index' },
        { key: '6', finger: 'right-index' },
        { key: '7', finger: 'right-index' },
        { key: '8', finger: 'right-middle' },
        { key: '9', finger: 'right-ring' },
        { key: '0', finger: 'right-pinky' },
        { key: '-', finger: 'right-pinky' },
        { key: '=', finger: 'right-pinky' },
    ],
    [
        { key: 'q', finger: 'left-pinky' },
        { key: 'w', finger: 'left-ring' },
        { key: 'e', finger: 'left-middle' },
        { key: 'r', finger: 'left-index' },
        { key: 't', finger: 'left-index' },
        { key: 'y', finger: 'right-index' },
        { key: 'u', finger: 'right-index' },
        { key: 'i', finger: 'right-middle' },
        { key: 'o', finger: 'right-ring' },
        { key: 'p', finger: 'right-pinky' },
        { key: '[', finger: 'right-pinky' },
        { key: ']', finger: 'right-pinky' },
    ],
    [
        { key: 'a', finger: 'left-pinky', home: true },
        { key: 's', finger: 'left-ring', home: true },
        { key: 'd', finger: 'left-middle', home: true },
        { key: 'f', finger: 'left-index', home: true },
        { key: 'g', finger: 'left-index' },
        { key: 'h', finger: 'right-index' },
        { key: 'j', finger: 'right-index', home: true },
        { key: 'k', finger: 'right-middle', home: true },
        { key: 'l', finger: 'right-ring', home: true },
        { key: ';', finger: 'right-pinky', home: true },
        { key: "'", finger: 'right-pinky' },
    ],
    [
        { key: 'z', finger: 'left-pinky' },
        { key: 'x', finger: 'left-ring' },
        { key: 'c', finger: 'left-middle' },
        { key: 'v', finger: 'left-index' },
        { key: 'b', finger: 'left-index' },
        { key: 'n', finger: 'right-index' },
        { key: 'm', finger: 'right-index' },
        { key: ',', finger: 'right-middle' },
        { key: '.', finger: 'right-ring' },
        { key: '/', finger: 'right-pinky' },
    ],
    [
        { key: 'Space', finger: 'thumb', wide: true }
    ]
];

// Tamil Marutham layout with finger assignments
const TAMIL_LAYOUT = [
    [
        { key: 'ஃ', finger: 'left-pinky' },
        { key: '1', finger: 'left-pinky' },
        { key: '2', finger: 'left-ring' },
        { key: '3', finger: 'left-middle' },
        { key: '4', finger: 'left-index' },
        { key: '5', finger: 'left-index' },
        { key: '6', finger: 'right-index' },
        { key: '7', finger: 'right-index' },
        { key: '8', finger: 'right-middle' },
        { key: '9', finger: 'right-ring' },
        { key: '0', finger: 'right-pinky' },
        { key: '/', finger: 'right-pinky' },
        { key: '=', finger: 'right-pinky' },
    ],
    [
        { key: 'ணு', finger: 'left-pinky' },
        { key: 'ற', finger: 'left-ring' },
        { key: 'ந', finger: 'left-middle' },
        { key: 'ச', finger: 'left-index' },
        { key: 'வ', finger: 'left-index' },
        { key: 'ல', finger: 'right-index' },
        { key: 'ர', finger: 'right-index' },
        { key: 'ை', finger: 'right-middle' },
        { key: 'டி', finger: 'right-ring' },
        { key: 'ி', finger: 'right-pinky' },
        { key: 'ல்', finger: 'right-pinky' },
        { key: ',', finger: 'right-pinky' },
    ],
    [
        { key: 'ய', finger: 'left-pinky', home: true },
        { key: 'ள', finger: 'left-ring', home: true },
        { key: 'ன', finger: 'left-middle', home: true },
        { key: 'க', finger: 'left-index', home: true },
        { key: 'ப', finger: 'left-index' },
        { key: 'ா', finger: 'right-index' },
        { key: 'த', finger: 'right-index', home: true },
        { key: 'ம', finger: 'right-middle', home: true },
        { key: 'ட', finger: 'right-ring', home: true },
        { key: '்', finger: 'right-pinky', home: true },
        { key: 'ங', finger: 'right-pinky' },
    ],
    [
        { key: 'ண', finger: 'left-pinky' },
        { key: 'ஒ', finger: 'left-ring' },
        { key: 'உ', finger: 'left-middle' },
        { key: 'எ', finger: 'left-index' },
        { key: 'ெ', finger: 'left-index' },
        { key: 'ே', finger: 'right-index' },
        { key: 'அ', finger: 'right-index' },
        { key: 'இ', finger: 'right-middle' },
        { key: '.', finger: 'right-ring' },
    ],
    [
        { key: 'Space', finger: 'thumb', wide: true }
    ]
];

function VisualKeyboard({ language, nextChar, theme }) {
    const layout = language === 'tamil' ? TAMIL_LAYOUT : ENGLISH_LAYOUT;

    // Determine which key should be highlighted
    const highlightedKey = useMemo(() => {
        if (!nextChar) return null;

        // Normalize the character for comparison
        const char = nextChar.toLowerCase();

        // Find the key in the layout
        for (const row of layout) {
            for (const keyObj of row) {
                if (keyObj.key.toLowerCase() === char ||
                    (keyObj.key === 'Space' && char === ' ')) {
                    return keyObj.key;
                }
            }
        }
        return null;
    }, [nextChar, layout]);

    return (
        <div className="visual-keyboard">
            {layout.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((keyObj, keyIndex) => {
                        const isHighlighted = keyObj.key === highlightedKey;
                        const isHome = keyObj.home;

                        return (
                            <div
                                key={keyIndex}
                                className={`keyboard-key ${keyObj.wide ? 'wide' : ''} ${isHighlighted ? 'highlighted' : ''} ${isHome ? 'home-key' : ''}`}
                                style={{
                                    backgroundColor: FINGER_COLORS[keyObj.finger],
                                    borderColor: isHighlighted ? 'var(--accent-blue)' : 'var(--border)',
                                    borderWidth: isHighlighted ? '3px' : '1px'
                                }}
                                data-finger={keyObj.finger}
                            >
                                <span className="key-label">{keyObj.key}</span>
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Finger Guide */}
            <div className="finger-guide">
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['left-pinky'] }}></span>
                    <span className="finger-label">L. Pinky</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['left-ring'] }}></span>
                    <span className="finger-label">L. Ring</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['left-middle'] }}></span>
                    <span className="finger-label">L. Middle</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['left-index'] }}></span>
                    <span className="finger-label">L. Index</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['right-index'] }}></span>
                    <span className="finger-label">R. Index</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['right-middle'] }}></span>
                    <span className="finger-label">R. Middle</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['right-ring'] }}></span>
                    <span className="finger-label">R. Ring</span>
                </div>
                <div className="finger-guide-item">
                    <span className="finger-color" style={{ backgroundColor: FINGER_COLORS['right-pinky'] }}></span>
                    <span className="finger-label">R. Pinky</span>
                </div>
            </div>
        </div>
    );
}

export default VisualKeyboard;
