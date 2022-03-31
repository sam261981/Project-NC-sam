const db = require('../db/connection')

exports.checkUsers = async () => {
  const usersArr = await db.query('SELECT * FROM users;')
  return usersArr.rows
}
