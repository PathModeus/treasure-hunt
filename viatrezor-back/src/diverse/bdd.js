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

connection.query('CREATE TABLE IF NOT EXISTS individuals(id_vr TEXT PRIMARY KEY, role TEXT NOT NULL DEFAULT "joueur")')
connection.query('CREATE TABLE IF NOT EXISTS players(id_vr TEXT PRIMARY KEY, team_id INTEGER DEFAULT "-1", FOREIGN KEY(team_id) REFERENCES teams(team_id) ON DELETE SET DEFAULT)')
connection.query('CREATE TABLE IF NOT EXISTS admins(id_vr TEXT PRIMARY KEY, asso_name TEXT NOT NULL)')
connection.query('CREATE TABLE IF NOT EXISTS teams(team_id INTEGER PRIMARY KEY, team_name TEXT NOT NULL, ongoing_activity TEXT NOT NULL, timer_status TINYINT DEFAULT "0", time INTEGER DEFAULT "0", timer_last_on DATETIME NOT NULL, points INTEGER NOT NULL DEFAULT "0")')

connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021berliouxqu', 'superadmin')")
connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021brayto', 'superadmin')")
connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021perede', 'superadmin')")

connection.end()

module.exports = connection