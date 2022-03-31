const { checkUsers } = require('../models/users.models')

exports.getUsers = (req, res, next) => {
  checkUsers()
    .then((users) => {
      res.status(200).send({ users })
    })
    .catch((err) => next(err))
}
