const db = require('../db/connection')

exports.selectCommentsByArticleId = async (article_id) => {
  const commentsArr = await db.query(
    'SELECT comments.* FROM comments WHERE comments.article_id = $1;',
    [article_id],
  )
  if (commentsArr.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'comments not found' })
  }
  return commentsArr.rows
}
