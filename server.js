const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route for landing page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for api notes
app.get('/api/notes', (req, res) =>
  // reads db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // returns all saved notes as JSON
    res.json(JSON.parse(data));
  })
);

// POST Route for api notes
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  // assigns id to note
  newNote.id = uuidv4();
  // reads db.json file and pushes data into db.json
  let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  data.push(newNote);
  // writes file to db.json
  fs.writeFileSync('./db/db.json', JSON.stringify(data));
  res.json(data)
});

// DELETE Route for specific note
app.delete('/api/notes/:id', (req, res) => {
  // reads db.json file
  let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  // filters out note with specific id
  let updatedData = data.filter(note => note.id !== req.params.id);
  // rewrites file to db.json
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedData));
  res.json(updatedData)
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);