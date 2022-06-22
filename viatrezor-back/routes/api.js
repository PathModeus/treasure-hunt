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

    bdd.query('SELECT id_vr FROM admins WHERE id_vr = (?)', [user.login], (err, rows) => { 
        if (err) {
            res.status(500);
        } else if (!rows.length) {
            bdd.query('SELECT id_vr FROM players WHERE id_vr = (?)', [user.login], (err, rows, fields) => {
                if (err) {
                    res.status(500);
                } else if (!rows.length) {
                    bdd.query('INSERT INTO players(id_vr) VALUES (?)', [user.login]);
                }
            })
        }
    })
    return res.redirect('http://localhost:3000/login')
})

// Fonctionnalités liées à la gestion d'équipe

// Création d'équipe

router.post('/team/create', (req, res, next) => {
    // Il faut que le front envoie les champs membres et nom d'équipe d'un coup
    var team_name = req.body.team_name
    var vr_ids = req.body.members.split(";")
    let team_id = bdd.query('INSERT INTO teams(team_name) OUTPUT INSERTED.ID VALUES (?)', [team_name], (err) => {
        if (err) throw err
        console.log("Equipe créée avec succès !")
    })
    for (let vr_id of vr_ids) {
        bdd.query('UPDATE players SET team_id = (?) WHERE vr_id = (?)', [team_id, vr_id])
    }
})

// Vérification d'appartenance à une équipe (vérifier que le id_team =/= 0) (Retourne le nom de l'équipe si en a une)

router.get('/team/ispartof', async (req, res, next) => {
    var user = req.session.user
    bdd.query('SELECT team_id FROM players WHERE id_vr = (?)', [user.login], (err, rows, fields) => {
        if (!rows.length || err) {
            res.status(500).json('An error as occured');
        } else {
            bdd.query('SELECT team_name, points, time, ongoing_activity FROM teams WHERE team_id = (?)', [rows[0].team_id], (err, rows, fields) => {
                if (!rows.length || err) {
                    res.status(500).json('An error as occured');
                } else {
                    res.json(rows[0]);
                }
            })
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

// Vérification des droits de l'utilisateur

router.get('/role', (req, res, next) => {
    var user = req.session.user
    bdd.query('SELECT id_vr FROM players WHERE id_vr = (?)', [user.login], (err, rows, fields) => {
        if (err) throw err
        if (!rows[0].id_vr) {
            res.json('joueur')
        }
        else {
            bdd.query('SELECT id_vr FROM players WHERE id_vr = (?)', [user.login], (err, rows, fields) => {
                if (err) throw err
                if (!rows[0].id_vr) {
                    res.json('admin')
                }
                else {
                    res.json('Non inscrit ?!')
                }
            })
        }
    })
})

// Donne toutes les infos de l'auth sur l'utilisateur connecté (format --> https://auth.viarezo.fr/docs/authorization_code)

router.get('/whoami', (req, res) => {
    return res.json(req.session.user);
});

router.get('/connect', (req, res, next) => {
    res.redirect('http://localhost:3000')
})

// Cette route récupère n'importe quelle autre requête GET et renvoie un Hello World

router.get('/:nimp', (req, res, next) => {
    res.json('Hello world')
});

module.exports = router;
