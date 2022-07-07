// Fichier qui contient les fonctions qui permettent de répartir les équipes sur les diverses épreuves.
//
// Ces fonctions devraient prendre en compte le nombre actuel d'équipes à l'épreuve ou en route.
//
const bdd = require('../../models/db');


async function next_chall(team_name) {
    let activities_list = await bdd.activities.findAll();
    let activities_done = await bdd.history.findAll({ where: { team_name: team_name } });
    let activity_load = await bdd.teams.count({ group: ['ongoing_activity'] });
    var min_temp = 10000;
    var next_activity = 'final_enigma';
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
