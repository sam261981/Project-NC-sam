const express = require("express");
const app = express();
const { getTopic } = require('./controllers/topics.controller')

app.use(express.json());

app.get("/api/topics", getTopic)
// console.lod(topics, '<------')

app.all('/*', (erq, res) => {
    res.status(404).send({msg: 'Route not found'})
})


module.exports = app;




