const res = require('express/lib/response')
const db = require('../db/connection')


exports.selectArticleById = async (articleId) => {
    const articleData = await db.query('SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;', [articleId])
    if(articleData.rows.length === 0){
    return Promise.reject({status: 404, msg: "article id not found"})
    } 
    return articleData.rows
    }
    
    exports.incrementArticleById = async (articleId, vote) => {
     const voteInc = vote.votes;
     if (voteInc === 0){
         Promise.reject({status: 404, msg: 'No Increase Specified'})
         }
         const increaseArticle = await db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;', [voteInc, articleId])
         return increaseArticle.rows[0]
    }