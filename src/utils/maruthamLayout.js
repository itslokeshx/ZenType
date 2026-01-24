/**
 * Marutham Keyboard Layout Mapping (Correct Layout)
 * Maps English QWERTY keys to Tamil characters
 */

export const maruthamLayout = {
    // Row 1 (Number row)
    '`': { normal: 'ஃ', shifted: '*' },
    '~': { normal: '*', shifted: '*' },  // Shift+` produces ~
    '1': { normal: '1', shifted: 'ஸ' },
    '!': { normal: 'ஸ', shifted: 'ஸ' },  // Shift+1 produces !
    '2': { normal: '2', shifted: '"' },
    '@': { normal: '"', shifted: '"' },  // Shift+2 produces @
    '3': { normal: '3', shifted: '#' },
    '#': { normal: '#', shifted: '#' },  // Shift+3 produces #
    '4': { normal: '4', shifted: 'ஐ' },
    '$': { normal: 'ஐ', shifted: 'ஐ' },  // Shift+4 produces $
    '5': { normal: '5', shifted: '%' },
    '%': { normal: '%', shifted: '%' },  // Shift+5 produces %
    '6': { normal: '6', shifted: '^' },
    '^': { normal: '^', shifted: '^' },  // Shift+6 produces ^
    '7': { normal: '7', shifted: 'ஷ' },
    '&': { normal: 'ஷ', shifted: 'ஷ' },  // Shift+7 produces &
    '8': { normal: '8', shifted: '*' },
    '*': { normal: '*', shifted: '*' },  // Shift+8 produces *
    '9': { normal: '9', shifted: '(' },
    '(': { normal: '(', shifted: '(' },  // Shift+9 produces (
    '0': { normal: '0', shifted: ')' },
    ')': { normal: ')', shifted: ')' },  // Shift+0 produces )
    '-': { normal: '/', shifted: 'ஶ்ரீ' },
    '_': { normal: 'ஶ்ரீ', shifted: 'ஶ்ரீ' },  // Shift+- produces _
    '=': { normal: '=', shifted: 'ஹ' },
    '+': { normal: 'ஹ', shifted: 'ஹ' },  // Shift+= produces +
    '\\': { normal: '\\', shifted: 'க்ஷ' },
    '|': { normal: 'க்ஷ', shifted: 'க்ஷ' },  // Shift+\ produces |

    // Row 2 (QWERTY row)
    'q': { normal: 'ணு', shifted: 'ண' },
    'w': { normal: 'ற', shifted: 'று' },
    'e': { normal: 'ந', shifted: 'நு' },
    'r': { normal: 'ச', shifted: 'சு' },
    't': { normal: 'வ', shifted: 'கூ' },
    'y': { normal: 'ல', shifted: 'லு' },
    'u': { normal: 'ர', shifted: 'ரு' },
    'i': { normal: 'ை', shifted: 'ஐ' },
    'o': { normal: 'டி', shifted: 'டீ' },
    'p': { normal: 'ி', shifted: 'ீ' },
    '[': { normal: 'ு', shifted: 'ூ' },
    '{': { normal: 'ூ', shifted: 'ூ' },  // Shift+[ produces { on keyboard
    ']': { normal: ',', shifted: 'ீ' },
    '}': { normal: 'ீ', shifted: 'ீ' },  // Shift+] produces } on keyboard

    // Row 3 (ASDF row)
    'a': { normal: 'ய', shifted: '' },
    's': { normal: 'ள', shifted: 'ளு' },
    'd': { normal: 'ன', shifted: 'னு' },
    'f': { normal: 'க', shifted: 'கு' },
    'g': { normal: 'ப', shifted: 'ழு' },
    'h': { normal: 'ா', shifted: 'ழ' },
    'j': { normal: 'த', shifted: 'து' },
    'k': { normal: 'ம', shifted: 'மு' },
    'l': { normal: 'ட', shifted: 'டு' },
    ';': { normal: '்', shifted: '' },
    "\'": { normal: 'ங', shifted: 'ஞ' },
    '"': { normal: 'ஞ', shifted: 'ஞ' },  // Shift+' produces " on keyboard

    // Row 4 (ZXCV row)
    'z': { normal: 'ண', shifted: 'ூ' },
    'x': { normal: 'ஒ', shifted: 'ஓ' },
    'c': { normal: 'உ', shifted: 'ஊ' },
    'v': { normal: 'எ', shifted: 'ஏ' },
    'b': { normal: 'ெ', shifted: 'க்ஷ' },
    'n': { normal: 'ே', shifted: 'சூ' },
    'm': { normal: 'அ', shifted: 'ஆ' },
    ',': { normal: 'இ', shifted: 'ஈ' },
    '.': { normal: '.', shifted: '?' },

    // Space remains space
    ' ': { normal: ' ', shifted: ' ' },
};

/**
 * Convert English key to Tamil character based on Marutham layout
 * @param {string} key - The pressed key
 * @param {boolean} shifted - Whether shift is pressed
 * @returns {string} - Tamil character or original key if not mapped
 */
export const convertToTamil = (key, shifted = false) => {
    const mapping = maruthamLayout[key.toLowerCase()];
    if (!mapping) return key;
    return shifted ? mapping.shifted : mapping.normal;
};

/**
 * Find which English key produces a given Tamil character
 * @param {string} tamilChar - The Tamil character to find
 * @returns {object|null} - Object with {engKey: string, shifted: boolean} or null if not found
 */
export const getTamilKeyMapping = (tamilChar) => {
    // Normalize the character
    const char = tamilChar.normalize('NFC');

    // Search through all mappings
    for (const [engKey, mapping] of Object.entries(maruthamLayout)) {
        // Check normal (unshifted) key
        if (mapping.normal === char) {
            return { engKey: engKey.toLowerCase(), shifted: false };
        }
        // Check shifted key
        if (mapping.shifted === char) {
            return { engKey: engKey.toLowerCase(), shifted: true };
        }
    }

    // Handle space specially
    if (char === ' ') {
        return { engKey: ' ', shifted: false };
    }

    return null;
};
