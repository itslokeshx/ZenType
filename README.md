# ZenType ⚡

A beautiful, modern typing practice application supporting both English and Tamil (Marutham keyboard layout). Perfect for improving typing speed and accuracy with a clean, distraction-free interface.

![ZenType](https://img.shields.io/badge/version-1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🌐 **Dual Language Support**: Practice typing in English or Tamil (Marutham layout)
- ⏱️ **Flexible Timer**: Choose from 15s, 30s, 60s, or set a custom duration
- 🎨 **Dark/Light Theme**: Comfortable typing experience in any lighting
- 📊 **Real-time Statistics**: Track WPM, accuracy, correct/wrong words, and keystrokes
- 🎯 **Live Feedback**: Instant visual feedback on typing accuracy
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✨ **Glassmorphism UI**: Modern, elegant design with smooth animations

## 🚀 Quick Start

### Option 1: Visit the Live Site
Simply visit the hosted version at: `https://YOUR-USERNAME.github.io/ZenType`

### Option 2: Run Locally

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/ZenType.git
cd ZenType
```

2. Start a local server:
```bash
# Using Python 3
python3 -m http.server 8080

# Or using Python 2
python -m SimpleHTTPServer 8080

# Or using Node.js
npx serve
```

3. Open your browser and navigate to `http://localhost:8080`

## 🎮 How to Use

1. **Select Language**: Choose between English or தமிழ் (Tamil)
2. **Set Timer**: Pick a duration or enter a custom time (1-600 seconds)
3. **Start Typing**: Click on the typing area and start typing the displayed words
4. **Track Progress**: Monitor your WPM, accuracy, and other stats in real-time
5. **View Results**: When time's up, see your detailed performance metrics

## 🎯 Tamil Marutham Keyboard Layout

The application uses the standard Marutham keyboard layout for Tamil typing. Simply type using your English keyboard, and it will automatically convert to Tamil characters.

**Example mappings:**
- Press `a` → யு
- Press `s` → ளு  
- Press `Shift + a` → யூ
- Press `space` or `enter` to complete a word

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling via CDN
- **Babel Standalone** - JSX transformation
- **Mukta Malar Font** - Tamil typography
- **Inter Font** - English typography

## 📁 Project Structure

```
ZenType/
├── index.html          # Main HTML file
├── app.js             # React application code
├── styles.css         # Custom styles and animations
└── README.md          # Documentation
```

## 🌐 Deploy to GitHub Pages

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com) and create a new repository named `ZenType`
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR-USERNAME/ZenType.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at `https://YOUR-USERNAME.github.io/ZenType`

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --accent-light: #3B82F6;  /* Primary color */
  --success-light: #10B981; /* Success color */
  --error-light: #EF4444;   /* Error color */
}
```

### Adding More Words
Edit the word pools in `app.js`:
```javascript
const ENGLISH_WORDS = [...];
const TAMIL_WORDS = [...];
```

### Adjusting Timer Durations
Modify the duration options in the ControlPanel component:
```javascript
{[15, 30, 60].map((duration) => ( /* ... */ ))}
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.

## 💖 Acknowledgments

- Designed for Tamil learners and government exam preparation
- Marutham keyboard layout support for authentic Tamil typing
- Inspired by popular typing practice tools like MonkeyType

## 🐛 Known Issues

None currently! Report issues on the [GitHub Issues](https://github.com/YOUR-USERNAME/ZenType/issues) page.

## 📬 Contact

Created with ♥ for Tamil learners

---

⭐ Star this repository if you found it helpful!