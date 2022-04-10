const {
  selectArticleById,
  incrementArticleById,
  fetchArticleByQuery,
} = require('../models/article.model')

exports.getArticleById = (req, res, next) => {
  const { article_id: articleId } = req.params
  selectArticleById(articleId)
    .then((article) => {
      res.status(200).send({ article })
    })
    .catch((err) => next(err))
}

exports.patchArticle = (req, res, next) => {
  const { article_id: articleId } = req.params
  const vote = req.body
  incrementArticleById(articleId, vote)
    .then((article) => {
      res.status(201).send({ article })
    })
    .catch((err) => next(err))
}

exports.getArticles = (req, res, next) => {
  const { order, topic, sort_by } = req.query
  return fetchArticleByQuery(sort_by, order, topic)
    .then((result) => {
      if (result.length === 0) {
        console.log('hi')
        res
          .status(400)
          .send({ message: 'Article does not contain your searchterm' })
      } else {
        res.send(result)
      }
    })
    .catch((err) => next(err))
}
