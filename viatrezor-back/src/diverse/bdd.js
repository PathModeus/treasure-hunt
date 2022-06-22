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

connection.query('CREATE TABLE IF NOT EXISTS teams(team_id INTEGER PRIMARY KEY AUTO_INCREMENT, team_name TEXT NOT NULL, ongoing_activity TEXT NOT NULL, timer_status TINYINT DEFAULT "0", time INTEGER DEFAULT "0", timer_last_on DATETIME NOT NULL DEFAULT "2000-01-01T01:01:01", points INTEGER NOT NULL DEFAULT "0")');
connection.query('CREATE TABLE IF NOT EXISTS players(id_player INTEGER PRIMARY KEY AUTO_INCREMENT, id_vr TEXT, team_id INTEGER DEFAULT "0", FOREIGN KEY(team_id) REFERENCES teams(team_id) ON DELETE SET DEFAULT)');
connection.query('CREATE TABLE IF NOT EXISTS admins(id_admin INTEGER PRIMARY KEY AUTO_INCREMENT, id_vr TEXT, asso_name TEXT NOT NULL)');
connection.query('CREATE TABLE IF NOT EXISTS activities(team_id INTEGER PRIMARY KEY AUTO_INCREMENT, activity_1 TINYINT NOT NULL DEFAULT "0", activity_2 TINYINT NOT NULL DEFAULT "0", activity_3 TINYINT NOT NULL DEFAULT "0", activity_4 TINYINT NOT NULL DEFAULT "0", activity_5 TINYINT NOT NULL DEFAULT "0", activity_6 TINYINT NOT NULL DEFAULT "0", activity_7 TINYINT NOT NULL DEFAULT "0")');

// INITIALISATION DE LA TABLE ADMINS

// Superadmins = Vrgens
// Admins = 2As des autres assos
// Reste = Joueurs
//
// L'idée est que les VRgens puissent remplacer n'importe quel staffeur / prêter leur PC au cas où il y ait un problème pour un staffeur
// Une autre idée simple est de faire en sorte que tous les admins soient rentrés "à la main" lors de l'initialisation
// et que n'importe quelle autre personne se connectant soit considérée comme joueur (Least privilege by default)
// Cela pourrait également permettre à un 2A de venir aider une équipe qui serait en manque de joueurs ou de prêter son compte si un GPA ne l'a pas initialisé
//
// Le tri des admins se fera via leur Asso.
// Etre à ViaRézo donne tous les droits.
// Etre ailleurs donne uniquement accès à l'épreuve de son club.

// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021berliouxqu', 'VR')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021brayto', 'VR')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021perede', 'VR')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021elyaagobi', 'VR')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021augierme', 'VR')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021gaudronan', 'VR')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021kalflechju', 'VR')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021bireem', 'CS Design')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021meignanco', 'Pics')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021rosenberju', 'CStudio')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021adjivonce', 'Club Tech')");
// connection.query("INSERT INTO admin (id_vr, asso) VALUES ('2021achghafan', 'AlgorithmiCS')");

// INITIALISATION DE LA TABLE TEAMS

// Par défaut, tout joueur se connectant se retrouvera dans l'équipe numéro 0 'Sans équipe', et devra changer d'équipe avant de pouvoir partir
//
// connection.query("INSERT INTO teams (team_id, team_name, ongoing_activity) VALUES (0, 'No team', 'Looking for a team')");
//

module.exports = connection;