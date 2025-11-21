const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// lokasi data.json
const DATA_PATH = path.join(__dirname, 'data.json');

// helper baca dan tulis
function readData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}
function writeData(json) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(json, null, 2), 'utf8');
}

// --- endpoints CRUD untuk infos ---
app.get('/api/infos', (req, res) => {
  const data = readData();
  res.json(data.infos);
});

app.get('/api/infos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const item = data.infos.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

app.post('/api/infos', (req, res) => {
  const data = readData();
  const newId = data.infos.length ? Math.max(...data.infos.map(i => i.id)) + 1 : 1;
  const newItem = {
    id: newId,
    title: req.body.title || 'Untitled',
    summary: req.body.summary || '',
    body: req.body.body || '',
    img: req.body.img || ''
  };
  data.infos.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

app.put('/api/infos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const idx = data.infos.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const updated = Object.assign(data.infos[idx], req.body);
  data.infos[idx] = updated;
  writeData(data);
  res.json(updated);
});

app.delete('/api/infos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const idx = data.infos.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const removed = data.infos.splice(idx, 1);
  writeData(data);
  res.json({ message: 'Deleted', item: removed[0] });
});

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Backend API UTS Web 1 BERJALAN!");
});
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
