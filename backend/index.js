const express = require('express');
const cors = require('cors');
const translate = require('translate-google');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// translate keywords
app.post('/api/translate', async (req, res) => {
  try {
    const { keywords, targetLanguage } = req.body;

    if (!keywords || !Array.isArray(keywords)) {
      return res.status(400).json({ error: 'Keywords array is required' });
    }

    if (!targetLanguage) {
      return res.status(400).json({ error: 'Target language is required' });
    }

    // translate each keyword
    const translationPromises = keywords.map(async (keyword) => {
      try {
        const result = await translate(keyword, { to: targetLanguage });
        return result;
      } catch (error) {
        console.error(`Error translating "${keyword}":`, error.message);
        return keyword; // just return original if fails
      }
    });

    const translations = await Promise.all(translationPromises);

    res.json({
      success: true,
      translations,
      targetLanguage
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation service error' });
  }
});

// check if server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Translation API is running' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Translation API server running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});

// handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

// cleanup on exit
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nShutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
