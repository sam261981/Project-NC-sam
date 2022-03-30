
const { selectArticleById } = require('../models/article.model')


exports.getArticleById = (req, res, next) =>{
const {article_id: articleId} = req.params;
 selectArticleById(articleId).then((article)=>{
     res.status(200).send({article})
 })
 .catch((err) => next(err))
 }