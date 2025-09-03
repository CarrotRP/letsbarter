const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL)
    .then(res => app.listen(3000))
    .catch(err => console.log(err));

app.use(express.json());


app.get('/', (req, res) => {
    res.json('hello bruh')
})