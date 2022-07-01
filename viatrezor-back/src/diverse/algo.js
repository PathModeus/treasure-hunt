// Fichier qui contient les fonctions qui permettent de répartir les équipes sur les diverses épreuves.
//
// Ces fonctions devraient prendre en compte le nombre actuel d'équipes à l'épreuve ou en route.
//
const bdd = require('../../models/db');

// A termes, il faudra que cette liste soit déduite de la BDD
let activities_list = ['activity_1', 'activity_2', 'activity_3', 'activity_4', 'activity_5', 'activity_6', 'activity_7']


async function next_chall(team_id) {
    activities_done = (await bdd.activities.findByPk(team_id));
    activity_load = (await bdd.teams.count({ group: ['ongoing_activity'] }));
    var min_temp = 10000;
    var next_activity = 'final_enigma';
    for (let activity of activities_list) {
        load = activity_load[activity] ? activity_load[activity] : 0;
        if (!activities_done[activity] && load <= min_temp) {
            min_temp = load;
            next_activity = activity;
        }
    }
    return (next_activity)
}

module.exports.next_chall = next_chall;
