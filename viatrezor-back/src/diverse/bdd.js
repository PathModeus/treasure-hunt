const mysql = require('mysql')

// Connection à la BDD

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'captain',
    password: 'sacrebleu',
    database: 'letresor'
})

// connection.query('SELECT .... as beep', (err, rows, fields) => { if err throw(err) console.log(rows[0].beep)})
connection.connect()

module.exports = connection;