const { selectCommentsByArticleId } = require('../models/comments.model')

exports.getCommentArticleBeId = (req, res, next) => {
  const artId = req.params.article_id
  selectCommentsByArticleId(artId)
    .then((comments) => {
      if (comments.length > 0) {
        res.status(200).send(comments)
      } else {
        return Promise.reject({ status: 404, msg: 'comments not found' })
      }
    })
    .catch((err) => next(err))
}
