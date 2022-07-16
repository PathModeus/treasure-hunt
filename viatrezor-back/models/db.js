const Sequelize = require("sequelize");
const config = require("../config.json")


// Connection à la BDD
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
});


// Structure de la bdd
const Activities = sequelize.define("activities", {
    name: { type: Sequelize.STRING, primaryKey: true },
    description: { type: Sequelize.TEXT }
});

const Teams = sequelize.define("teams", {
    team_name: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    ongoing_activity: { type: Sequelize.STRING, defaultValue: "En attente d'activité", allowNull: false, references: { model: Activities, key: 'name' }, onDelete: 'SET DEFAULT' },
    timer_status: { type: Sequelize.BOOLEAN, defaultValue: false },
    time: { type: Sequelize.INTEGER, defaultValue: 0 },
    timer_last_on: { type: Sequelize.DATE, allowNull: false, defaultValue: "2000-01-01T01:01:01" },
    points: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
});

const Players = sequelize.define("players", {
    id_vr: { type: Sequelize.STRING, primaryKey: true },
    team_name: { type: Sequelize.STRING, defaultValue: 'No team', references: { model: Teams, key: 'team_name' }, onDelete: 'SET DEFAULT' }  // onDelete: 'SET DEFAULT'
});

const Admins = sequelize.define("admins", {
    id_vr: { type: Sequelize.STRING, primaryKey: true },
    asso_name: { type: Sequelize.STRING, allowNull: false, references: { model: Activities, key: 'name' }, onDelete: 'CASCADE' },
});

const History = sequelize.define("history", {
    team_name: { type: Sequelize.STRING, primaryKey: true, allowNull: false, references: { model: Teams, key: 'team_name' }, onDelete: 'CASCADE' },
    activity_name: { type: Sequelize.STRING, primaryKey: true, allowNull: false, references: { model: Activities, key: 'name' }, onDelete: 'CASCADE' }
});


// Synchronisation de la bdd
/* l'argument force: true drop les tables de la bdd avant de les recréer pour éviter les doublons */
sequelize.sync()
    .then(async () => {
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
        await Activities.bulkCreate([
            {
                name: "En attente d'activité",
                description: "Attendez un instant, je me connecte à la base de données pour récupérer votre première épreuve..."
            },
            {
                name: "Arcade",
                description: "Où suis-je ? Je suis perdu ! Venez m'aider ! Attendez je vois quelque chose... peut être un indice ? EE ? 004 ? Derrière le refectoire ?"
            },
            {
                name: "Corde",
                description: "Ahhhh toutes ces émotions m'ont donné envie d'un peu d'air frais ! Et si on allait passer un peu de bon temps proches de la nature, près des bois, un espace vert et dégagé pas trop loin des bâtiments non plus mais un peu caché derriere l'un d'entre eux..."
            },
            {
                name: "Kahoot",
                description: "Dans un grand carré, au bout d'une diagonale, se logent quelques gradins devant des projections... Idéal pour une présentation ou un jeu télévisé !"
            },
            {
                name: "Molkky",
                description: "Dans la vie il ne suffit pas d'avoir un esprit sain, il faut aussi un corps sain ! Nous vous attendons au dessus du Musée..."
            },
            {
                name: "Blindtest",
                description: "Un grand auteur, de beaux textes, de jolis fauteuils et une sacré scène... Tout cela réuni en un seul lieu ? On me dit que c'est pas trop loin d'un gymnase..."
            },
            {
                name: "Fin du jeu",
                description: "Félicitations, vous avez réussi toutes les épreuves ! Rendez-vous le plus vite possible au stand départ pour arrêter le chrono !"
            }
        ], { ignoreDuplicates: true }).then(() => {
            console.log("Activities created");
        });

        await Admins.bulkCreate([
            { id_vr: '2021berliouxqu', asso_name: "Fin du jeu" },   // Ces admins pourront mettre fin au chrono
            // { id_vr: '2021brayto', asso_name: 'VR' },
            // { id_vr: '2021perede', asso_name: 'VR' },
            { id_vr: '2021elyaagobi', asso_name: 'Corde' },
            // { id_vr: '2021augierme', asso_name: 'VR' },
            { id_vr: '2021gaudronan', asso_name: "Kahoot" },
            { id_vr: '2021labellefl', asso_name: 'Molkky' },
            { id_vr: '2021kalflechju', asso_name: 'Blindtest' },
            { id_vr: "2021cheneauan", asso_name: "Arcade" },
            { id_vr: "2021zahreddija", asso_name: "Kahoot" },
            { id_vr: "2021goddema", asso_name: "Kahoot" }
            // { id_vr: '2021bireem', asso_name: 'CS Design' },
            // { id_vr: '2021meignanco', asso_name: 'Pics' },
            // { id_vr: '2021rosenberju', asso_name: 'CStudio' },
            // { id_vr: '2021adjivonce', asso_name: 'Club Tech' },
            // { id_vr: '2021achghafan', asso_name: 'AlgorithmiCS' },
        ], { ignoreDuplicates: true }).then(() => {
            console.log("Admins have been saved")
        });

        await Teams.bulkCreate([
            { team_name: 'No team' }
        ], { ignoreDuplicates: true }).then(() => {
            console.log("Default team has been created");
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

    exemple: db.teams.create({id_vr: "2021random", points: 3})
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
