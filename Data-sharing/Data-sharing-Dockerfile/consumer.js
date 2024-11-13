// consumer.js
const fs = require('fs');
const path = require('path');

// File path in the shared volume
const filePath = path.join('/shared-data', 'data.txt');

// Read and display data every 5 seconds
setInterval(() => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log(`Consumer: ${data}`);
  } else {
    console.log("Consumer: No data available yet.");
  }
}, 5000);
