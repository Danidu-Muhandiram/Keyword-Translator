const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const server = app.listen(3000, '0.0.0.0', () => {
  console.log('Test server running on http://localhost:3000');
});

// Keep process alive
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  server.close();
  process.exit(0);
});
