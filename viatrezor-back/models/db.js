const Sequelize = require("sequelize");


// Connection à la BDD
const sequelize = new Sequelize('letresor', 'captain', 'sacrebleu', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
});


// Structure de la bdd
const Activities = sequelize.define("activities", {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
    description: {type: Sequelize.TEXT}
});

const Teams = sequelize.define("teams", {
    team_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    team_name: {type: Sequelize.STRING, allowNull: false, unique: true},
    ongoing_activity: {type: Sequelize.INTEGER, defaultValue: 1, allowNull: false, references: {model: Activities, key: 'id'}, onDelete: 'SET DEFAULT'},
    timer_status: {type: Sequelize.BOOLEAN, defaultValue: false},
    time: {type: Sequelize.INTEGER, defaultValue: 0},
    timer_last_on: {type: Sequelize.DATE, allowNull: false, defaultValue: "2000-01-01T01:01:01"},
    points: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
});

const Players = sequelize.define("players", {
    id_vr: {type: Sequelize.STRING, primaryKey: true},
    team_id: {type: Sequelize.INTEGER, defaultValue: 1, references: {model: Teams, key: 'team_id'}, onDelete: 'SET DEFAULT'}  // onDelete: 'SET DEFAULT'
});

const Admins = sequelize.define("admins", {
    id_vr: {type: Sequelize.STRING, primaryKey: true},
    asso_name: {type: Sequelize.TEXT, allowNull: false}
});

const History = sequelize.define("history", {
    team_id: {type: Sequelize.INTEGER, primaryKey: true, references: {model: Teams, key: 'team_id'}, onDelete: 'CASCADE'},
    activity_id: {type: Sequelize.INTEGER, primaryKey: true, references: {model: Activities, key: 'id'}, onDelete: 'CASCADE'}
},);


// Synchronisation de la bdd
/* l'argument force: true drop les tables de la bdd avant de les recréer pour éviter les doublons */ 
sequelize.sync()
    .then(() => {
        console.log("Synced db.");
        // Initialisation de la bdd
        /*
            Superadmins = Vrgens
            Admins = 2As des autres assos
            Reste = Joueurs
        
            L'idée est que les VRgens puissent remplacer n'importe quel staffeur / prêter leur PC au cas où il y ait un problème pour un staffeur
            Une autre idée simple est de faire en sorte que tous les admins soient rentrés "à la main" lors de l'initialisation
            et que n'importe quelle autre personne se connectant soit considérée comme joueur (Least privilege by default)
            Cela pourrait également permettre à un 2A de venir aider une équipe qui serait en manque de joueurs ou de prêter son compte si un GPA ne l'a pas initialisé
        
            Le tri des admins se fera via leur Asso.
            Etre à ViaRézo donne tous les droits.
            Etre ailleurs donne uniquement accès à l'épreuve de son club.
        */
        Admins.bulkCreate([
            { id_vr: '2021berliouxqu', asso_name: 'VR' },
            { id_vr: '2021brayto', asso_name: 'VR' },
            { id_vr: '2021perede', asso_name: 'VR' },
            { id_vr: '2021elyaagobi', asso_name: 'VR' },
            { id_vr: '2021augierme', asso_name: 'VR' },
            { id_vr: '2021gaudronan', asso_name: 'VR' },
            { id_vr: '2021kalflechju', asso_name: 'VR' },
            { id_vr: '2021bireem', asso_name: 'CS Design' },
            { id_vr: '2021meignanco', asso_name: 'Pics' },
            { id_vr: '2021rosenberju', asso_name: 'CStudio' },
            { id_vr: '2021adjivonce', asso_name: 'Club Tech' },
            { id_vr: '2021achghafan', asso_name: 'AlgorithmiCS' },
        ], {ignoreDuplicates: true}).then(() => {
            console.log("Admins have been saved")
        });
        
        Teams.bulkCreate([
            {team_name: 'No team', ongoing_activity: 'Looking for a team'}
        ], {ignoreDuplicates: true}).then(() => {
            console.log("Default team has been created");
        });
        
        Activities.bulkCreate([
            {   
                description: "En attente de la première épreuve"
            },
            {
                name: "Jeu Vidéo",
                description: "Pour obtenir la prochaine barre de réseau il faudra que vous complétiez un Jeu Vidéo. Rendez-vous en Sd.201 pour affronter vos adversaires ! \nQue le meilleur gagne !"
            },
            {
                name: "Autre épreuve",
                description: "Description de la deuxième épreuve"
            }
        ], {ignoreDuplicates: true}).then(() => {
            console.log("Activities created");
        });
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


// export du modele
/*
    Les methodes sur les tables crées renvoient des promesses:

    create a new Tutorial: create(object)
    find a Tutorial by id: findByPk(id)
    get all Tutorials: findAll()
    update a Tutorial by id: update(data, where: { id: id })
    upsert a Tutorial by id: update if match else insert
    remove a Tutorial: destroy(where: { id: id })
    remove all Tutorials: destroy(where: {})
    find all Tutorials by title: findAll({ where: { title: ... } })

    exemple: db.team.create({id_vr: "2021random", team_id: 1})
*/
const db = {
    sequelize: sequelize,
    teams: Teams,
    players: Players,
    admins: Admins,
    activities: Activities,
    history: History,
}

module.exports = db;