const express = require('express')
const app = express()
const { getTopic } = require('./controllers/topics.controller')
const { fetchUsers } = require('./controllers/users.controller')
const { getCommentsByArticleId } = require('./controllers/comments.controller')
const {
  getArticleById,
  patchArticle,
} = require('./controllers/article.controller')
app.use(express.json())

app.get('/api/topics', getTopic)
app.get('/api/users', fetchUsers)
app.get('/api/topics', getTopic)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.patch('/api/articles/:article_id', patchArticle)

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg })
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' })
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.log(err, '<-------')
  res.status(500).send({ msg: 'Internal Service Error' })
})

app.all('/*', (erq, res) => {
  res.status(404).send({ msg: 'Route not found' })
})

module.exports = app
