const readFileSync = require('fs').readFileSync;
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT;

const data = JSON.parse(readFileSync('./files/new_data.json', 'utf8'));
const categories = JSON.parse(readFileSync('./files/category_data.json', 'utf8'));

app.get('/', (req, res) => {
    res.send('Luigiz Backend');
});

app.get('/categories', (req, res) => {
    console.log('[server]: Received request for categories list');
    const filePath = path.join(__dirname, 'files/categories.json');
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    if (fs.existsSync(filePath)) {
        res.status(200).sendFile(filePath);
    } else {
        res.status(500).send('Error finding category file');
    }
});

app.post("/product", (req, res) => {
    const id = req.query['id'];
    if (!id) {
        res.status(400).send('Product request must include id');
    }

    for (let thingo of data) {
        if (thingo.ID === id) {
            res.send(thingo);
            break;
        }
    }
    res.status(404).send(`Cannot find item with id ${id}`);
})

app.post("/search", (req, res) => {
    const category = req.query['cat'];
    const search = req.query['q'];
    const page = req.query['p'] - 1;

    let items = [];
    if (!categories.hasOwnProperty(category)) {
        res.status(400).send('Search request must include category');
    }
    const catsToSearch = category !== 'all' ? [category] : categories.keys();
    for (let cat of catsToSearch) {
        for (let thingo of categories[cat]) {
            if (!search || thingo.includes(search)) {
                items.push(data[thingo]);
            }
        }
    }
    res.send(nextData(page ?? 0, items));
})

app.post("/next", (req, res) => {
    const offset = req.query['offset'];
    res.status(200).send(nextData(offset))
})

app.get('/:site', (req, res) => {
    const filePath = path.join(__dirname, 'files/sites', req.params['site'] + '.json');
    console.log(`[server]: Received request for site ${req.params['site']} -> path is ${filePath}`);
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    if (fs.existsSync(filePath)) {
        console.log(`[server]: Found file for site ${req.params['site']}`);
        res.status(200).sendFile(filePath);
    } else {
        res.status(404).send('Cannot find listing for site ' + req.params['site']);
    }
});

function nextData(place, items) {
    if (!data || place * 20 >= data.length) {
        return [];
    }
    return items.slice(place * 20, Math.min((place + 1) * 20, data.length));
}

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});