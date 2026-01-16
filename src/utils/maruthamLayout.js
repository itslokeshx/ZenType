/**
 * Marutham Keyboard Layout Mapping (Correct Layout)
 * Maps English QWERTY keys to Tamil characters
 */

export const maruthamLayout = {
    // Row 1 (Number row)
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

    // Row 2 (QWERTY row)
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

    // Row 3 (ASDF row)
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

    // Row 4 (ZXCV row)
    'z': { normal: 'ணு', shifted: 'ணூ' },
    'x': { normal: 'ஒ', shifted: 'ஓ' },
    'c': { normal: 'உ', shifted: 'ஊ' },
    'v': { normal: 'எ', shifted: 'ஏ' },
    'b': { normal: 'ெ', shifted: 'ை' },
    'n': { normal: 'ே', shifted: 'ௌ' },
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
