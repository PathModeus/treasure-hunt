const express = require('express');
const router = express.Router();
const bdd = require('../src/diverse/bdd');


// Exemples de routes
// Commencer par router.
// puis ajouter le type de requête à intercepter (get, post, delete, etc.)
// puis la fin de l'url à laquelle ce middleware doit réagir
// puis la fonction de réponse
//
// Attention :
// La syntaxe /:var fait que n'importe quoi après / est stocker comme un argument nommé var
// Il faut donc le mettre comme une solution par défaut et les autres avant !!!

// Ajout du joueur à la bdd
// Rediriger le joueur via cette route depuis l'auth
// Est-ce qu'on met tous les admins à l'initialisation et on met par défaut qu'il s'agit de joueur ?
// Quitte à faire un bouton pour mettre admin quelqu'un, voire juste via une commande SQL

router.get('/init', (req, res) => {
    var user = req.session.user

    bdd.query('SELECT id_vr FROM players WHERE id_vr = (?)', [user.login], (err, rows) => {
        if (err) {
            res.status(500);
        } else if (!rows.length) {
            bdd.query('INSERT INTO players(id_vr) VALUES (?)', [user.login]);
        }
    })
    return res.redirect('http://localhost:3000/login')
})

// Fonctionnalités liées à la gestion d'équipe

// Création d'équipe

router.post('/team/create', (req, res) => {
    // Il faut que le front envoie les champs membres et nom d'équipe d'un coup
    let team_name = req.body.team_name;
    let vr_ids;
    if (req.body.members.includes(";")) {
        vr_ids = req.body.members.split(";");
    }
    bdd.query('INSERT INTO teams (team_name, ongoing_activity) VALUES (?, ?)', [team_name, "Null"], (err, row) => { 
        if (err || !row?.insertId) {
            res.status(500).end();
        } else {
            console.log("Equipe créée avec succès !");
            for (let vr_id of vr_ids) {
                bdd.query('SELECT id_vr FROM players WHERE id_vr = (?)', [vr_id], (err, rows) => { 
                    if (err) {
                        res.status(500).end();
                    } else if (!rows.length) {
                        bdd.query('INSERT INTO players(id_vr, team_id) VALUES (?, ?)', [vr_id, row.insertId]);
                    } else {
                        bdd.query('UPDATE players SET team_id = (?) WHERE id_vr = (?)', [row.insertId, vr_id]);
                    }
                })
            }
        }
    })
})

// Ajout de points bonus

router.post('/team/bonus', (req, res, next) => {
    var team_name = req.body.team_name
    var bonus = req.body.bonus
    bdd.query('SELECT points FROM teams WHERE team_name = (?)', [team_name], (err, rows, fields) => {
        if (err) throw err
        bdd.query('UPDATE teams SET points = (?) WHERE team_name = (?)', [rows[0] + bonus, team_name], (err) => {
            if (err) throw err
            res.json('Bonus accordé !')
        })
    })
})

// Arrêt du timer et MAJ du temps

router.post('/team/stop', (req, res, next) => {
    var team_name = req.body.team_name
    var date = new Date()
    var temps = date.now()
    bdd.query('SELECT timer_status FROM teams WHERE team_name = (?)', [team_name], (err, rows, fields) => {
        if (rows[0].timer_status == 1) {
            bdd.query('SELECT time, timer_last_on FROM teams WHERE team_name = (?)', [team_name], (err, rows, fields) => {
                bdd.query('UPDATE teams SET time = (?) WHERE team_name = (?)', [rows[0].time - rows[0].timer_last_on + temps], (err) => { if (err) throw err })
            })
            bdd.query('UPDATE teams SET timer_last_on = (?), timer_status = "0" WHERE team_name = (?)', [temps, team_name], (err, rows, fields) => {
                if (err) throw err
            })
        }
        else {
            res.json('Timer déjà arrêté !')
        }
    })
})

// Renvoie les informations de l'équipe concernée

router.get('/team/:id', (req, res) => {
    bdd.query('SELECT team_name, ongoing_activity, timer_status, time, timer_last_on, points FROM teams WHERE team_id = (?)', [req.params.id], (err, rows, fields) => {
        if (!rows.length || err) {
            res.status(500).json('An error as occured');
        } else {
            res.json(rows[0]);
        }
    })
})

// Donne toutes les infos de l'auth sur l'utilisateur connecté (format --> https://auth.viarezo.fr/docs/authorization_code)

router.get('/whoami', (req, res) => {
    let user = req.session.user
    let role = null;
    bdd.query('SELECT asso_name FROM admins WHERE id_vr = (?)', [user.login], (err, rows) => { 
        if (err) {
            res.status(500).json({...req.session.user, role});
        } else if (!rows.length) {
            bdd.query('SELECT team_id FROM players WHERE id_vr = (?)', [user.login], (err, rows, fields) => {
                if (err || !rows.length) {
                    res.status(500).json({...req.session.user, role});
                } else {
                    role = ["player", rows[0].team_id];
                    return res.json({...req.session.user, role});
                }
            })
        } else {
            role = ["admin", rows[0].asso_name];
            return res.json({...req.session.user, role});
        }
    })
});

router.get('/connect', (req, res, next) => {
    res.redirect('http://localhost:3000')
})

// Cette route récupère n'importe quelle autre requête GET et renvoie un Hello World

router.get('/:nimp', (req, res, next) => {
    res.json('Hello world')
});

module.exports = router;

// Si certain players ne se sont jamais connectes avant d'être ajouté à une équipe échec : pareil si c'est un admin