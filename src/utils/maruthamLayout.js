/**
 * Marutham Keyboard Layout Mapping (Correct Layout)
 * Maps English QWERTY keys to Tamil characters
 */

export const maruthamLayout = {
    // Row 1 (Number row)
    '`': { normal: 'ஃ', shifted: '*' },
    '1': { normal: '1', shifted: 'ஸ' },
    '2': { normal: '2', shifted: '"' },
    '3': { normal: '3', shifted: '#' },
    '4': { normal: '4', shifted: 'ஐ' },
    '5': { normal: '5', shifted: '%' },
    '6': { normal: '6', shifted: '^' },
    '7': { normal: '7', shifted: 'ஷ' },
    '8': { normal: '8', shifted: '*' },
    '9': { normal: '9', shifted: '(' },
    '0': { normal: '0', shifted: ')' },
    '-': { normal: '/', shifted: 'ஶ்ரீ' },
    '=': { normal: '=', shifted: 'ஹ' },
    '\\': { normal: '\\', shifted: 'க்ஷ' },

    // Row 2 (QWERTY row)
    'q': { normal: 'ணு', shifted: 'ன' },
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
