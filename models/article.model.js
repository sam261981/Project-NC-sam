const db = require('../db/connection')


exports.selectArticleById = async (articleId) => {
    const articleData = await db.query('SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;', [articleId])
    if(articleData.rows.length === 0){
    return Promise.reject({status: 404, msg: "article id not found"})
    } 
    return articleData.rows
    }
    