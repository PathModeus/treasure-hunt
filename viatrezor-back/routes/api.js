const express = require('express');
const router = express.Router();
const next_chall = require('../src/diverse/algo').next_chall
const bdd = require('../src/diverse/bdd')

bdd.connect()

//connection.end()

// Exemples de routes
// Commencer par router.
// puis ajouter le type de requête à intercepter (get, post, delete, etc.)
// puis la fin de l'url à laquelle ce middleware doit réagir
// puis la fonction de réponse
//
// Attention :
// La syntaxe /:var fait que n'importe quoi après / est stocker comme un argument nommé var
// Il faut donc le mettre comme une solution par défaut et les autres avant !!!

router.get('/infos', (req, res, next) => {
    res.json(res.session.user)
});

router.get('/next', (req, res, next) => {
    var num_epreuve_suivante = 1 + Math.floor(7 * Math.random())
    res.json('Dirigez-vous maintenant vers l\'épreuve numéro ' + next_chall())
})

router.get('/', (req, res, next) => {
    console.log(req.session.user)
})

router.get('/:nimp', (req, res, next) => {
    res.json('Hello world')
});

module.exports = router;