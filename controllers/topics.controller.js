
const { selectTopic } = require('../models/topics.model')

exports.getTopic = (req, res, next) => {
    selectTopic().then((data) => {
        res.status(200).send({data})
    })
    .catch((err) => next(err))
}





