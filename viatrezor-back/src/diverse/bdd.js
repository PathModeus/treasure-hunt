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

// INITIALISATION DE LA BDD :

connection.query('CREATE TABLE IF NOT EXISTS individuals(id_indiv INTEGER PRIMARY KEY AUTO_INCREMENT, id_vr TEXT, role TEXT NOT NULL)')
connection.query('CREATE TABLE IF NOT EXISTS teams(team_id INTEGER PRIMARY KEY AUTO_INCREMENT, team_name TEXT NOT NULL, ongoing_activity TEXT NOT NULL, timer_status TINYINT DEFAULT "0", time INTEGER DEFAULT "0", timer_last_on DATETIME NOT NULL DEFAULT "2000-01-01T01:01:01", points INTEGER NOT NULL DEFAULT "0")')
connection.query('CREATE TABLE IF NOT EXISTS players(id_player INTEGER PRIMARY KEY AUTO_INCREMENT, id_vr TEXT, team_id INTEGER DEFAULT "0", FOREIGN KEY(team_id) REFERENCES teams(team_id) ON DELETE SET DEFAULT)')
connection.query('CREATE TABLE IF NOT EXISTS admins(id_admin INTEGER PRIMARY KEY AUTO_INCREMENT, id_vr TEXT, asso_name TEXT NOT NULL)')

// INITIALISATION DE LA TABLE INDIVIDUALS
//
// Superadmins = Vrgens
// Admins = 2As des autres assos
// Reste = Joueurs
//
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021berliouxqu', 'superadmin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021brayto', 'superadmin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021perede', 'superadmin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021elyaagobi', 'superadmin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021augierme', 'superadmin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021gaudronan', 'superadmin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021kalflechju', 'superadmin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021bireem', 'admin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021meignanco', 'admin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021rosenberju', 'admin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021adjivonce', 'admin')")
// connection.query("INSERT INTO individuals (id_vr, role) VALUES ('2021achghafan', 'admin')")
//
// INITIALISATION DE LA TABLE TEAMS
//
// Par défaut, tout joueur se connectant se retrouvera dans l'équipe numéro 0 'Sans équipe', et devra changer d'équipe avant de pouvoir partir
//
// connection.query("INSERT INTO teams (team_id, team_name, ongoing_activity) VALUES (0, 'Sans équipe', 'En recherche d\'équipe')")
//

module.exports = connection