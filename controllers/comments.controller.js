const {
  selectCommentsByArticleId,
  postCommentsById,
} = require('../models/comments.model')

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send(comments)
    })
    .catch((err) => next(err))
}
exports.postComments = (req, res, next) => {
  const { article_id } = req.params
  const { username, body } = req.body
  postCommentsById(article_id, username, body)
    .then((comment) => {
      return res.status(201).send(comment)
    })

    .catch((err) => next(err))
}
