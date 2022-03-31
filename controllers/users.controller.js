



exports.fetchUsers = (req, res, next) => {
    getUsers().then((user) => {
        res.status(200).send({user})
    })
.catch((err) => next(err))
}
