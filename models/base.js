sqlite3=require('better-sqlite3')
exports.db= new sqlite3('models/grocery.db',{verbose:console.log})
