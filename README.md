# ZenType - Premium Typing Practice Platform

A world-class, exam-grade typing practice application focused on **Tamil (Marutham layout)** and **English (QWERTY)**. Designed for government exam preparation with zero tolerance for Tamil Unicode handling errors.

![ZenType](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🌐 **Dual Language Support**: Tamil (Marutham layout) and English (QWERTY)
- ⌨️ **Built-in Marutham Layout**: No OS keyboard switch needed! Type Tamil using your English keyboard
- 🎨 **Beautiful Themes**: Light and dark mode with smooth transitions
- ⏱️ **Flexible Timer**: Set custom minutes and seconds for practice sessions
- 📊 **Detailed Metrics**: WPM, accuracy, keystrokes breakdown, and word counts
- 🎯 **Exam-Focused**: 100+ government exam-relevant Tamil words
- 🔤 **Unicode Perfect**: NFC normalization for accurate Tamil character comparison
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- 💾 **Persistent Settings**: Remembers your theme, language, and timer preferences

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/zentype.git
cd zentype

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## ⌨️ How Tamil Input Works

**No OS keyboard configuration needed!** 

When you switch to Tamil mode, the app automatically uses the **Marutham keyboard layout**. Simply type using your regular English keyboard, and it will be converted to Tamil characters in real-time.

For example:
- Press `a` → அ
- Press `h` → ய
- Press `k` → ல
- Press `m` → ம

The complete Marutham layout mapping is built into the application!


## 📖 How to Use

1. **Select Language**: Click EN or தமிழ் to switch between English and Tamil
2. **Set Timer**: Enter minutes and seconds (default: 1:00)
3. **Start Typing**: Click Start or just begin typing to auto-start
4. **Type Words**: Type the highlighted word and press Space or Enter
5. **View Results**: Timer ends automatically or click Stop to see your performance

## 🎯 Metrics Explained

- **WPM (Words Per Minute)**: `(Correct Keystrokes / 5) / Time in Minutes`
- **Accuracy**: `(Correct Keystrokes / Total Keystrokes) × 100`
- **Keystrokes**: Shows correct (green) and wrong (red) keystroke counts
- **Word Counts**: Number of correctly and incorrectly typed words

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Pure CSS with CSS Variables
- **State Management**: React Hooks
- **Storage**: localStorage
- **Fonts**: 
  - English: Inter, SF Pro Display
  - Tamil: Noto Serif Tamil, Latha

## 🎨 Design Philosophy

- **Apple-grade minimalism**: Clean, spacious, no visual noise
- **Exam-room feel**: Serious, focused, professional
- **Zero distractions**: No animations except essential feedback
- **Accessibility**: High contrast ratios, clear focus states
- **Performance**: 60fps always, no jank

## 📂 Project Structure

```
zentype/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Complete styling with themes
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global resets
│   ├── data/
│   │   ├── englishWords.js  # 100+ common English words
│   │   └── tamilWords.js    # 100+ government exam Tamil words
│   └── utils/
│       ├── normalize.js     # Unicode normalization utilities
│       └── maruthamLayout.js # Marutham keyboard layout mapping
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 Configuration

### Customizing Word Lists

Edit `src/data/englishWords.js` or `src/data/tamilWords.js` to add your own words:

```javascript
export const tamilWords = [
  'தமிழ்', 'அரசு', 'தேர்வு',
  // Add your words here
];
```

### Changing Theme Colors

Edit CSS variables in `src/App.css`:

```css
:root[data-theme="light"] {
  --bg-primary: #FAFAFA;
  --accent-blue: #3B82F6;
  /* Customize colors */
}
```

## 🧪 Testing Tamil Input

Test these Tamil character combinations to verify Unicode handling:

- **Vowel signs**: கா, கி, கீ, கு, கூ, கெ, கே, கை, கொ, கோ, கௌ
- **Pulli**: க், த், ன், ம்
- **Compound letters**: க்ஷ, ஶ்ரீ
- **Long words**: அமைச்சகம், விண்ணப்பம், சான்றிதழ்

## 🚫 What's NOT Included (By Design)

- ❌ Virtual keyboard display
- ❌ Auto-correction
- ❌ Suggestions/autocomplete
- ❌ Paste functionality
- ❌ Backspace to previous word
- ❌ Animated backgrounds
- ❌ Sound effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Tamil word list curated for government exam preparation
- Inspired by professional typing test platforms
- Built with ❤️ for Tamil language learners

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the Tamil keyboard setup guide above
- Ensure your browser supports Tamil Unicode (all modern browsers do)

---

**Made with 🔥 for Tamil typing excellence**
