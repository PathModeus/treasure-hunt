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

connection.query('CREATE TABLE IF NOT EXISTS individuals(id_indiv INTEGER PRIMARY KEY, id_vr TEXT, role TEXT NOT NULL)')
connection.query('CREATE TABLE IF NOT EXISTS teams(team_id INTEGER PRIMARY KEY, team_name TEXT NOT NULL, ongoing_activity TEXT NOT NULL, timer_status TINYINT DEFAULT "0", time INTEGER DEFAULT "0", timer_last_on DATETIME NOT NULL, points INTEGER NOT NULL DEFAULT "0")')
connection.query('CREATE TABLE IF NOT EXISTS players(id_player INTEGER PRIMARY KEY, id_vr TEXT, team_id INTEGER DEFAULT "0", FOREIGN KEY(team_id) REFERENCES teams(team_id) ON DELETE SET DEFAULT)')
connection.query('CREATE TABLE IF NOT EXISTS admins(id_admin INTEGER PRIMARY KEY, id_vr TEXT, asso_name TEXT NOT NULL)')

// INITIALISATION DE LA BDD :
// Superadmins = Vrgens
// Admins = 2As des autres assos
//
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (1, '2021berliouxqu', 'superadmin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (2, '2021brayto', 'superadmin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (3, '2021perede', 'superadmin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (4, '2021elyaagobi', 'superadmin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (5, '2021augierme', 'superadmin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (6, '2021gaudronan', 'superadmin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (7, '2021kalflechju', 'superadmin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (8, '2021bireem', 'admin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (9, '2021meignanco', 'admin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (10, '2021rosenberju', 'admin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (11, '2021adjivonce', 'admin')")
// connection.query("INSERT INTO individuals (id_indiv, id_vr, role) VALUES (12, '2021achghafan', 'admin')")
//
//

module.exports = connection