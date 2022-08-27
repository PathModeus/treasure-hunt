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
            Etre à ViaRezo donne tous les droits.
            Etre ailleurs donne uniquement accès à l'épreuve de son club.
        */
        await Activities.bulkCreate([
            {
                name: "En attente d'activité",
                description: "Attendez un instant, je me connecte à la base de données pour récupérer votre première épreuve..."
            },
            {
                name: "ViaRezo",
                description: "Au milieu du labyrinthe de matière au rez-de-chaussée d'Eiffel... // Il faut aller en MF.OO1"
            },
            {
                name: "AlgorithmiCS",
                description: "Dans un endroit égal à la masse fois la vitesse de la lumière au carré, au rez-de-chaussée du bloc C"
            },
            {
                name: "LinkCS",
                description: "L'amphi le plus haut d'Eiffel..."
            },
            {
                name: "CS Design",
                description: "Au premier étage de Vivant ..."
            },
            {
                name: "Pics",
                description: "Endroit où la meilleure asso du campus vous a fait cotiser // Il faut aller en terrasse studio"
            },
            {
                name: "CStudio",
                description: "Good job finding the sd.102... unless you know about maps.centralesupelec.fr !"
            },
            {
                name: "Club Tech",
                description: "J'ai le prochain lieu en Bouygues, c'est là où on confectionne, là où on fait... Ouvrez l'oeil pour les imprimantes 3D...  // Il faut aller devant la fabrique"
            },
            {
                name: "Fin du jeu",
                description: "Félicitations, vous avez réussi toutes les épreuves ! Rendez-vous le plus vite possible au stand départ pour arrêter le chrono !"
            }
        ], { ignoreDuplicates: true }).then(() => {
            console.log("Activities created");
        });

        await Admins.bulkCreate([
            { id_vr: '2021berliouxqu', asso_name: "ViaRezo" },   // Ces admins pourront mettre fin au chrono
            { id_vr: '2021brayto', asso_name: 'ViaRezo' },
            { id_vr: '2021perede', asso_name: 'ViaRezo' },
            { id_vr: '2021elyaagobi', asso_name: 'ViaRezo' },
            { id_vr: '2021augierme', asso_name: 'ViaRezo' },
            { id_vr: '2021gaudronan', asso_name: "ViaRezo" },
            { id_vr: '2021labellefl', asso_name: 'ViaRezo' },
            { id_vr: '2021kalflechju', asso_name: 'LinkCS' },
            { id_vr: "2021cheneauan", asso_name: "ViaRezo" },
            { id_vr: "2021zahreddija", asso_name: "ViaRezo" },
            { id_vr: "2021goddema", asso_name: "ViaRezo" },
            { id_vr: '2020touizrath', asso_name: "ViaRezo" },
            { id_vr: '2021antieres', asso_name: 'LinkCS' },
            { id_vr: '2021dewildelo', asso_name: 'ViaRezo' },
            { id_vr: '2021migliassth', asso_name: 'ViaRezo' },
            { id_vr: '2021bireem', asso_name: 'CS Design' },
            { id_vr: '2021rosenberju', asso_name: 'CStudio' },
            { id_vr: '2021chouraqube', asso_name: 'CStudio' },
            { id_vr: '2021adjivonce', asso_name: 'Club Tech' },
            { id_vr: '2021anseaumelo', asso_name: 'Club Tech' },
            { id_vr: '2021achghafan', asso_name: 'AlgorithmiCS' },
            { id_vr: '2021lotfiay', asso_name: 'AlgorithmiCS' },
            { id_vr: '2021davidcl2', asso_name: "Pics" },
            { id_vr: '2021rozeca', asso_name: "Pics" },
            { id_vr: '2021lupili', asso_name: "Pics" }

        ], { ignoreDuplicates: true }).then(() => {
            console.log("Admins have been saved")
        });

        await Teams.bulkCreate([
            { team_name: 'exemple1', ongoing_activity: 'ViaRezo' },
            { team_name: 'exemple2', ongoing_activity: 'LinkCS' },
            { team_name: 'exemple3', ongoing_activity: 'CS Design' },
            { team_name: 'exemple4', ongoing_activity: 'Pics' },
            { team_name: 'exemple5', ongoing_activity: 'AlgorithmiCS' },
            { team_name: 'exemple6', ongoing_activity: 'Club Tech' },
            { team_name: 'exemple7', ongoing_activity: 'CStudio' }

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
