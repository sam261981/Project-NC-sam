const db = require('../db/connection')


exports.selectTopic = async () => {
    const data = await db.query('SELECT * FROM topics;')
    return data.rows
}






