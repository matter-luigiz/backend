const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Luigiz Backend');
});

app.get('/:site', (req, res) => {
    const filePath = path.join(__dirname, 'sites', req.params['site'] + '.json');
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
})

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});