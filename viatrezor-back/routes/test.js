const express = require('express');
const router = express.Router();
const next_chall = require('../src/diverse/algo').next_chall
const bdd = require('../models/db')

// Fichier pour mettre les routes de test
//
// Ces routes commencent par /api_test
//
//
//
//

// Tests

// Test bdd
router.get('/infos', (req, res, next) => {
    bdd.query('SELECT * FROM individuals', (err, rows, fields) => {
        if (err) throw err

        res.json("Test de BDD: " + rows[0].id_vr + rows[1].id_vr + rows[2].id_vr)
    })
});

//Test algo repartition
router.get('/next', (req, res, next) => {
    res.json('Dirigez-vous maintenant vers l\'épreuve numéro ' + next_chall())
})


module.exports = router;