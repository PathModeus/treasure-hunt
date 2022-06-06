const express = require('express');
const router = express.Router();
const next_chall = require('../src/diverse/algo').next_chall
const bdd = require('../src/diverse/bdd')
const mysql = require('mysql')

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

router.get('/team/create',)





// Tests

router.get('/infos', (req, res, next) => {
    bdd.query('SELECT * FROM individuals', (err, rows, fields) => {
        if (err) throw err
        console.log(rows)

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