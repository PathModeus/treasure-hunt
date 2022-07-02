const express = require('express');
const router = express.Router();
const bdd = require('../models/db');
const algo = require('../src/diverse/algo');
const config = require('../config.json');


// Exemples de routes
// Commencer par router.
// puis ajouter le type de requête à intercepter (get, post, delete, etc.)
// puis la fin de l'url à laquelle ce middleware doit réagir
// puis la fonction de réponse
//
// Attention :
// La syntaxe /:var fait que n'importe quoi après / est stocker comme un argument nommé var
// Il faut donc le mettre comme une solution par défaut et les autres avant !!!

// Ajout du joueur à la bdd
// Rediriger le joueur via cette route depuis l'auth
// Est-ce qu'on met tous les admins à l'initialisation et on met par défaut qu'il s'agit de joueur ?
// Quitte à faire un bouton pour mettre admin quelqu'un, voire juste via une commande SQL

router.get('/init', (req, res) => {
    console.log('Through /init')
    var user = req.session.user

    bdd.players.bulkCreate([{ id_vr: user.login }], { ignoreDuplicates: true }).catch((e) => {
        console.log(e)
    })
    return res.redirect(`${config.WEBROOT}/login`)
})

// Fonctionnalités liées à la gestion d'équipe

// Création d'équipe

router.post('/team/create', async (req, res) => {
    console.log('Through /team/create')
    // Il faut que le front envoie les champs membres et nom d'équipe d'un coup
    if (req.body.members.includes(";")) {
        let id_vr_list = req.body.members.split(";");
        try {
            let team = await bdd.teams.create({ team_name: req.body.team_name });
            let activity_id = await algo.next_chall(team.team_name);
            bdd.teams.update({ ongoing_activity: activity_id }, { where: { team_name: team.team_name } })
            bdd.history.create({ team_name: team.team_name, activity_id: 1 })
            for (let id_vr of id_vr_list) {
                bdd.players.upsert({ id_vr: id_vr, team_name: team.team_name }, { where: { id_vr: id_vr } });
            };
            return res.status(200).end();
        } catch (e) {
            console.log(e);
            return res.status(500).end();
        }
    } else {
        return res.status(500).end();
    }
})

// Ajout de points bonus

router.post('/team/bonus', async (req, res) => {
    console.log('Through /team/bonus')
    var team_name = req.body.team_name
    var bonus = req.body.bonus
    try {
        team = await bdd.teams.findByPk(team_name)
        bdd.teams.update({ points: team.points + bonus }, { where: { team_name: team_name } })
        return res.json('Bonus accordé !')
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
})

// Arrêt du timer et MAJ du temps

router.post('/team/stop', async (req, res) => {
    console.log('Through /team/stop')
    var team_name = req.body.team_name
    var date = new Date()
    var temps = date.now()
    try {
        team = await bdd.teams.findByPk(team_name)
        if (team.timer_status) {
            bdd.teams.update({ time: team.time + temps - team.timer_last_on, timer_last_on: temps, timer_status: 0 }, { where: { team_name: team_name } })
        } else {
            res.json('Timer déjà arrêté !')
        }
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

// Renvoie les informations de l'équipe concernée

router.get('/team/:team_name', async (req, res) => {
    console.log('Through /team/:team_name')
    try {
        let team = await bdd.teams.findByPk(req.params.team_name);
        let activity = await bdd.activities.findByPk(team.ongoing_activity);
        res.json({ team, activity });
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

// Donne toutes les infos de l'auth sur l'utilisateur connecté (format --> https://auth.viarezo.fr/docs/authorization_code)

router.get('/whoami', async (req, res) => {
    console.log('Through /whoami')
    let user = req.session.user
    try {
        let admin = await bdd.admins.findByPk(user.login)
        let player = await bdd.players.findByPk(user.login)
        return res.json({
            ...req.session.user, role: {
                admin: admin ? admin.asso_name : null,
                player: player ? player.team_name : null
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ...req.session.user, role: {
                admin: null,
                player: null
            }
        });
    }
});


// Redirection vers la page d'accueil

router.get('/connect', (req, res, next) => {
    console.log('Through /connect')
    res.redirect(config.WEBROOT)
})


// Met à jour l'activité après avoir passé une épreuve

router.post('/team/next', async (req, res, next) => {
    try {
        var team_name = req.body.team_name;
        let team_info = await bdd.teams.findByPk(team_name);
        let activity = team_info.ongoing_activity;
        await bdd.history.create({ team_name: team_name, activity_id: activity });
        let next_activity = await algo.next_chall(team_name)
        await bdd.teams.update({ ongoing_activity: next_activity }, { where: { team_name: team_name } })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})


// Cette route récupère n'importe quelle autre requête GET et renvoie un Hello World

router.get('/:nimp', (req, res, next) => {
    console.log('Through /:nimp')
    res.json('Hello world')
});

module.exports = router;

// Si certain players ne se sont jamais connectes avant d'être ajouté à une équipe échec : pareil si c'est un admin