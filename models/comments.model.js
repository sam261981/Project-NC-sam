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

exports.postCommentsById = async (article_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: 'bad request' })
  }
  const commentPostArr = await db.query(
    `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
    [article_id, username, body],
  )
  return commentPostArr.rows[0]
}
