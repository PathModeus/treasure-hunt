// Fichier qui contient les fonctions qui permettent de répartir les équipes sur les diverses épreuves.
//
// Ces fonctions devraient prendre en compte le nombre actuel d'équipes à l'épreuve ou en route.
//

const bdd = require('./bdd');

function next_chall(team_id) {
    bdd.query('SELECT * FROM activities WHERE team_id = (?)', [team_id], (err, rows, fields) => {
        if (err) throw err
        bdd.query('SELECT COUNT(*) FROM teams GROUP BY ongoing_activity', (err, rows, fields) => {
            if (err) throw err

            // itérer sur chacune des activités pour récupérer les activités non faites pour le moment
            // Trouver parmi les actis pas encore faites, celle sur laquelle il y a le moins d'équipes à cet instant

        })
        return 1 + Math.floor(Math.random())
    })
}

module.exports.next_chall = next_chall;