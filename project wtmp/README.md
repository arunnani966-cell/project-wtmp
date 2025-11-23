# AI Recipe Generator App

A Progressive Web App (PWA) built with **pure JavaScript** that helps you find recipes based on ingredients you have.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (Download from: https://nodejs.org/)

### Running the App

1. **Double-click `start-node.bat`**
   - This will start the Node.js server
   - Your browser will open automatically to `http://localhost:8000`

2. **Or use command line:**
   ```bash
   node server.js
   ```

3. **Keep the terminal window open** while using the app

4. **Press Ctrl+C** to stop the server when done

## 📝 Important Notes

- **You MUST use a local server** - Service workers don't work with `file://` protocol
- The app uses TheMealDB API (free, no API key needed)
- Favorites are saved locally in your browser (localStorage)
- Works offline after first load (PWA with service worker)

## 🐛 Troubleshooting

**"Site can't be reached" error?**
- Make sure the terminal shows "✅ SERVER IS RUNNING!"
- Wait a few seconds after starting
- Manually open: `http://localhost:8000`

**"Node.js not found" error?**
- Install Node.js from https://nodejs.org/
- Restart your computer after installation
- Try `start-node.bat` again

**Port 8000 already in use?**
- Close other applications using port 8000
- Or edit `server.js` and change `PORT = 8000` to another port

## 📱 Features

- ✅ Search recipes by ingredients
- ✅ View detailed recipe instructions
- ✅ Save favorite recipes offline
- ✅ Mobile-responsive design
- ✅ PWA-ready (installable on mobile)
- ✅ Works offline after first load

## 🛠️ Tech Stack

- **HTML** - Page structure
- **CSS** - Styling (mobile-responsive)
- **JavaScript** - App logic and API integration
- **Node.js** - Local development server
- **TheMealDB API** - Recipe data source

## 📁 Project Structure

```
├── index.html      # Main HTML file
├── styles.css      # All styling
├── app.js          # Main JavaScript application
├── sw.js           # Service Worker (PWA)
├── manifest.json   # PWA manifest
├── server.js       # Node.js development server
├── package.json    # Node.js project config
└── start-node.bat  # Quick launcher (Windows)
```

## 🌐 Alternative: VS Code Live Server

If you prefer not to use Node.js:
1. Install VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
