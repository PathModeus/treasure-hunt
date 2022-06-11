const express = require('express');
const router = express.Router();
const next_chall = require('../src/diverse/algo').next_chall
const bdd = require('../src/diverse/bdd')

// Exemples de routes
// Commencer par router.
// puis ajouter le type de requête à intercepter (get, post, delete, etc.)
// puis la fin de l'url à laquelle ce middleware doit réagir
// puis la fonction de réponse
//
// Attention :
// La syntaxe /:var fait que n'importe quoi après / est stocker comme un argument nommé var
// Il faut donc le mettre comme une solution par défaut et les autres avant !!!



// Fonctionnalités liées à la gestion d'équipe

// Création d'équipe
router.post('/team/create', (req, res, next) => {
    // On peut peut-être rajouter le fait d'avoir à ajouter tous les membres de l'équipe d'un coup
    var team_name = req.body.team_name
    bdd.query('INSERT INTO teams(team_name) VALUES (?)', [team_name], (err) => {
        if (err) throw err
        console.log("Equipe créée avec succès !")
    })
})

// Vérification d'appartenance à une équipe (vérifier que le id_team =/= 0) (Retourne le nom de l'équipe si en a une)
router.get('/team/ispartof', (req, res, next) => {
    var user = req.session.user
    bdd.query('SELECT team_id FROM players WHERE id_vr = (?)', [user], (err, rows, fields) => {
        if (err) throw err
        if (rows[0].team_id === 0) { res.json("Vous n'êtes pas encore dans une équipe !") } // On peut aussi faire ce tri côté front, je ne sais pas ce qui est préférable
        else {
            bdd.query('SELECT team_name FROM teams WHERE team_id = (?)', [rows[0].team_id], (err, rows, fields) => {
                res.json(rows[0].team_name)
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

// Tests

router.get('/infos', (req, res, next) => {
    bdd.query('SELECT * FROM individuals', (err, rows, fields) => {
        if (err) throw err

        res.json("Test de BDD: " + rows[0].id_vr + rows[1].id_vr + rows[2].id_vr)
    })
});

router.get('/next', (req, res, next) => {
    res.json('Dirigez-vous maintenant vers l\'épreuve numéro ' + next_chall())
})

router.get('/', (req, res, next) => {
    console.log(req.session.user)
})

router.get('/:nimp', (req, res, next) => {
    res.json('Hello world')
});

module.exports = router;