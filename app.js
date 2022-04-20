const express = require('express')
const { getTopic } = require('./controllers/topics.controller')
const cors = require('cors')
const {
  getCommentsByArticleId,
  postComments,
  deleteComment,
} = require('./controllers/comments.controller')
const { getUsers } = require('./controllers/users.controller')
const {
  getArticleById,
  patchArticle,
  getArticles,
  getApi,
} = require('./controllers/article.controller')
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/users', getUsers)
app.get('/api/topics', getTopic)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById)
app.patch('/api/articles/:article_id', patchArticle)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
app.post('/api/articles/:article_id/comments', postComments)
app.delete('/api/comments/:comment_id', deleteComment)
app.get('/api', getApi)
app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Route not found' })
})
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
  res.status(500).send({ msg: 'Internal Service Error' })
})

module.exports = app
