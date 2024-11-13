// producer.js
const fs = require('fs');
const path = require('path');

// File path in the shared volume
const filePath = path.join('/shared-data', 'data.txt');

// Append data to the file every 5 seconds
setInterval(() => {
  const data = `Data written at ${new Date().toISOString()}\n`;
  fs.appendFileSync(filePath, data);
  console.log(`Producer: ${data.trim()}`);
}, 5000);
