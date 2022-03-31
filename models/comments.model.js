const db = require('../db/connection')

exports.selectCommentsByArticleId = async (artId) => {
  const commentsArr = await db.query(
    'SELECT comments.* FROM comments WHERE article_id = $1;',
    [artId],
  )

  return commentsArr.rows
}
