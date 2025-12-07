# 🌍 Bulk Keyword Translator

A modern, fast, and beautiful keyword translation tool built with React and Node.js. Translate multiple keywords simultaneously into 77+ languages with a clean, intuitive interface.

This helps you make sure your keywords are accurate and appropriate in the target language. You can easily remove unnecessary terms and quickly copy the refined list for your work

<div align="center">

<img src="./images/image.png" width="850" />
<br>
<br>
<a href="https://keyword-translator.vercel.app">
  <img 
    src="https://img.shields.io/badge/🚀_Live_Demo-Visit_App-10b981?style=for-the-badge" 
    width="220"
  />
</a>


![Keyword Translator](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat&logo=react)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-06B6D4?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-ISC-blue.svg)

</div>

## ✨ Features

- 🎯 **Batch Translation** - Translate multiple keywords at once
- 😁 **Quick Copy** - Quickly copy the refined list for your keywords
- 🌐 **77+ Languages** - Support for major world languages
- 🔍 **Searchable Language Dropdown** - Quickly find your target language
- 🎨 **Modern UI** - Clean green and white theme with smooth animations
- 🏷️ **Tag-Based Input** - Each keyword becomes a removable tag
- ⚡ **Real-time Translation** - Fast parallel processing
- 🎭 **Synchronized Highlighting** - Hover over keywords to see their translations
- 📱 **Responsive Design** - Works on desktop and mobile
- 🚀 **Deployed on Vercel** - Fast global CDN delivery

## 🚀 Live Demo

**Frontend:** [https://keyword-translator.vercel.app](https://keyword-translator.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.21** - Build tool & dev server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express 4.x** - Web framework
- **translate-google 1.5.0** - Translation service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### DevOps
- **Vercel** - Hosting & deployment
- **Git** - Version control
- **Concurrently** - Run frontend & backend together

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone https://github.com/Danidu-Muhandiram/Keyword-Translator.git
cd Keyword-Translator
```

### Install Dependencies

**Root (for concurrent dev mode):**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

## ⚙️ Configuration

### Frontend Environment Variables
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

### Backend Environment Variables
Create `backend/.env`:
```env
PORT=3000
```

## 🚀 Running Locally

### Option 1: Run Both Servers Simultaneously (Recommended)
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📝 Usage

1. **Enter Keywords**: Type keywords separated by commas or press Enter after each or just copy set of keywords separated by commas
2. **Select Language**: Choose your target language from the searchable dropdown (default: Sinhala 🇱🇰)
3. **Translate**: Automaticaly translated to your target language, just choose your langauge from dropdown
4. **Hover to Highlight**: Hover over any keyword to see its translation highlighted
5. **Remove Keywords**: Click the ❌ on individual tags or use "Clear All"

## 🌍 Supported Languages

Afrikaans, Albanian, Arabic, Armenian, Azerbaijani, Basque, Belarusian, Bengali, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, Georgian, German, Greek, Gujarati, Haitian Creole, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Irish, Italian, Japanese, Kannada, Kazakh, Korean, Kyrgyz, Lao, Latin, Latvian, Lithuanian, Macedonian, Malay, Malayalam, Maltese, Marathi, Mongolian, Nepali, Norwegian, Persian, Polish, Portuguese, Punjabi, Romanian, Russian, Serbian, Sinhala, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Telugu, Thai, Turkish, Ukrainian, Urdu, Uzbek, Vietnamese, Welsh, Xhosa, Yiddish, Yoruba, Zulu

## 🚀 Deployment

### Deploy to Vercel

#### Backend Deployment
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Configure:
   - **Root Directory:** `backend`
   - **Framework Preset:** Other
   - **Environment Variables:** `PORT=3000`
4. Deploy and copy the URL

#### Frontend Deployment
1. Import the same repository again
2. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** `VITE_API_URL=https://your-backend-url.vercel.app`
3. Deploy

### Manual Deployment
```bash
# Build frontend
cd frontend
npm run build

# The dist folder is ready for deployment
```

## 📁 Project Structure

```
Keyword-Translator/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── index.css        # Tailwind styles
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── index.js             # Express server
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── vercel.json          # Vercel config
├── package.json             # Root package for dev scripts
└── README.md
```

## 🔧 API Documentation

### POST `/api/translate`
Translate multiple keywords to a target language.

**Request Body:**
```json
{
  "keywords": ["hello", "world", "translate"],
  "targetLanguage": "si"
}
```

**Response:**
```json
{
  "success": true,
  "translations": ["හෙලෝ", "ලෝකය", "පරිවර්තනය"],
  "targetLanguage": "si"
}
```

### GET `/api/health`
Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Translation API is running"
}
```

## 🐛 Known Issues

- **Translation Delay**: First request may take 2-5 seconds due to Vercel cold starts
- **Rate Limiting**: Using free translation scraper may hit rate limits with heavy use

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Danidu Muhandiram**
- GitHub: [@Danidu-Muhandiram](https://github.com/Danidu-Muhandiram)

## 🙏 Acknowledgments

- [translate-google](https://github.com/shikar/translate-google) - Free Google Translate API
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool
- [Vercel](https://vercel.com/) - Hosting platform

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Danidu-Muhandiram/Keyword-Translator?style=social)
![GitHub forks](https://img.shields.io/github/forks/Danidu-Muhandiram/Keyword-Translator?style=social)
![GitHub issues](https://img.shields.io/github/issues/Danidu-Muhandiram/Keyword-Translator)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Danidu-Muhandiram/Keyword-Translator)

---

⭐ **If you found this project helpful, please give it a star!** ⭐
