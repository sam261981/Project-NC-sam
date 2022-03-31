const express = require("express");
const app = express();
const { getTopic } = require('./controllers/topics.controller')
const { fetchUsers } = require('./controllers/users.controller')
app.use(express.json());

app.get('/api/topics', getTopic)
app.get('/api/users', fetchUsers)

app.all('/*', (erq, res) => {
    res.status(404).send({msg: 'Route not found'})
})


module.exports = app;




