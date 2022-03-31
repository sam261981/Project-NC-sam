const {
  selectArticleById,
  incrementArticleById,
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
      res.status(201).send({ article: article })
    })
    .catch((err) => next(err))
}
