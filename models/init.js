db = require('./base').db
fs = require('fs')

exports.init_DB = async () => {
   const script = fs.readFileSync('models/setup.sql','utf8')
    try {
        await db.exec(script)
    } catch (err) {
        console.log(err.message)
        return false
    }
    return true
}
