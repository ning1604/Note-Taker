const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// GET Route for landingpage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);