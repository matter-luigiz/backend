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

app.get("/product", (req, res) => {
    const id = parseInt(req.query['id']);
    if (!id) {
        res.status(400).send('Product request must include id');
        return;
    }

    const dataArr = Object.entries(data);
    for (let thingo of dataArr) {
        if (thingo[1]['ID'] === id) {
            res.status(200).send(thingo);
            return;
        }
    }
    res.status(404).send(`Cannot find item with id ${id}`);
})

app.get("/search", (req, res) => {
    const category = req.query['cat'];
    const search = req.query['q'];
    let page = parseInt(req.query['p'] ?? '0');
    page = page === 0 ? 0 : page - 1;

    let items = [];
    if (!categories.hasOwnProperty(category) && category !== 'all') {
        res.status(400).send('Search request must include category');
        return;
    }
    const catsToSearch = category !== 'all' ? [category] : Object.keys(categories);
    for (let cat of catsToSearch) {
        for (let thingo of categories[cat]) {
            if (!search || thingo.toLowerCase().includes(search.toLowerCase())) {
                items.push([thingo, data[thingo]]);
            }
        }
    }
    items.sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase(),undefined, { ignorePunctuation: true }));
    const sendData = nextData(page ?? 0, items);
    const dataWithCount = {
        data: sendData,
        size: items.length
    };
    res.status(200).send(dataWithCount);
})

app.get("/next", (req, res) => {
    const offset = req.query['offset'];
    res.status(200).send(nextData(offset, Object.entries(data)));
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
    if (!items || place * 20 >= items.length) {
        return [];
    }
    return items.slice(place * 20, Math.min((place + 1) * 20, items.length));
}

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});