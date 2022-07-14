// Fichier qui contient les fonctions qui permettent de répartir les équipes sur les diverses épreuves.
//
// Ces fonctions devraient prendre en compte le nombre actuel d'équipes à l'épreuve ou en route.
//
// On importe la connection à la bdd pour pouvoir y récupérer des informations
const bdd = require('../../models/db');


async function next_chall(team_name) {
    let activities_list_unfiltered = await bdd.activities.findAll();    // On ne peut pas filtrer directement
    let activities_list = activities_list_unfiltered.filter(item => item.name !== 'Fin du jeu'); // On enlève la dernière qui ne doit être donnée qui si tout a déja été fait avant
    let activities_done = await bdd.history.findAll({ where: { team_name: team_name } });
    let activity_load = await bdd.teams.count({ group: ['ongoing_activity'] }); // Méthode GROUP BY en Sequelize
    var min_temp = 10000; // Arbitraire mais assez grand (il n'y aura pas 10000 équipes sur la meme acti)
    var next_activity = 'Fin du jeu';   // Si toutes les activités ont été faites, cette valeur n'est pas modifiée
    for (let activity of activities_list) {
        let activity_load_filtered = activity_load.filter(item => item.ongoing_activity == activity.name);
        let activities_done_filtered = activities_done.filter(item => (item.activity_name == activity.name));
        let load = activity_load_filtered.length ? activity_load_filtered[0].count : 0;
        if (!activities_done_filtered.length && load <= min_temp) {
            min_temp = load;
            next_activity = activity.name;
        }
    }
    return (next_activity)
}

module.exports.next_chall = next_chall;
