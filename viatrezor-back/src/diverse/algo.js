// Fichier qui contient les fonctions qui permettent de répartir les équipes sur les diverses épreuves.
//
// Ces fonctions devraient prendre en compte le nombre actuel d'équipes à l'épreuve ou en route.
//


function next_chall() {
    return 1 + Math.floor(Math.random())
}

module.exports.next_chall = next_chall