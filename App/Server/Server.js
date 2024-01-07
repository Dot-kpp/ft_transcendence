const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

// Define a route handler for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!`);
});