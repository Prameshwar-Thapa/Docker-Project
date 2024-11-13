// app.js
const fs = require('fs');
const path = require('path');

// Set log file path
const logFile = path.join('/logs', 'app.log');

// Function to log messages at intervals
setInterval(() => {
  const logMessage = `${new Date().toISOString()} - This is a log message\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log('Log message written to app.log');
}, 5000);  // Logs every 5 seconds
