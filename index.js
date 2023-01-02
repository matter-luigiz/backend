import { readFileSync } from 'fs';

const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')

dotenv.config();

const app = express();
const port = process.env.PORT;

let items = [];

const data = JSON.parse(readFileSync('./backend/files/new_data.json', 'utf8'));
const categories = JSON.parse(readFileSync('./backend/files/category_data.json', 'utf8'));

app.get('/', (req, res) => {
    res.send('Luigiz Backend');
});

app.get('/categories', (req, res) => {
    console.log('[server]: Received request for categories list');
    const filePath = path.join(__dirname, 'files/categories.json');
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials" : true
    });
    if (fs.existsSync(filePath)) {
        res.status(200).sendFile(filePath);
    } else {
        res.status(500).send('Error finding category file');
    }
});
app.get('/:site', (req, res) => {
    const filePath = path.join(__dirname, 'files/sites', req.params['site'] + '.json');
    console.log(`[server]: Received request for site ${req.params['site']} -> path is ${filePath}`);
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials" : true
    });
    if (fs.existsSync(filePath)) {
        console.log(`[server]: Found file for site ${req.params['site']}`);
        res.status(200).sendFile(filePath);
    } else {
        res.status(404).send('Cannot find listing for site ' + req.params['site']);
    }
});

app.post("/product", (req, res) => {
  const { id } = req.body;
  for (let thingo of data) {
    if (thingo.ID === id) {
      res.send(thingo);
      break;
    }
  }
})

app.post("/search", (req, res) => {
    const { category, search } = (req.body);
  items = [];
  if (!categories.hasOwnProperty(category)) {
    return null;
  }
  for (let thingo of categories[category]) {
    if (thingo.includes(search)) {
      items.push(data[thingo]);
    }
  }
  res.send(nextData(0));
})

app.post("/next", (req, res) => {
    const { index } = req.body;
    res.send(nextData(index))
})

function nextData(place) {
  if (!data || place * 20 >= data.length) {
    return null;
  }
  return items.slice(place * 20, Math.min((place + 1) * 20, data.length));
}


app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});