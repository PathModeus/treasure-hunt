const express = require('express');
const router = express.Router();
const bdd = require('../models/db');
const algo = require('../src/diverse/algo');
const config = require('../config.json');
const wss = require("../server");


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


// Fonctionnalités liées à la gestion des joueurs

// Enregistrement du joueur dans la table players au moment de la connexion
router.get('/player/init', (req, res) => {
    console.log('Through /player/init');

    var user = req.session.user;
    try {
        bdd.players.bulkCreate([{ id_vr: user.login }], { ignoreDuplicates: true });
    } catch (e) {
        console.log(e);
    };
    return res.redirect(`${config.WEBROOT}/login`);
});

// Ajoute un joueur à une équipe
router.post('/player/add', (req, res) => {
    console.log('Through /player/add');

    try {
        let team = bdd.teams.findByPk(req.body.team_name);
        team.addPlayers({ id_vr: req.body.id_vr })

        if (wss.Clients[id_vr]) {
            wss.Clients[id_vr].send(JSON.stringify(team));
        };

        return res.status(200).end();
    } catch (e) {
        console.log(e);
    };
    return res.redirect(`${config.WEBROOT}/login`);
});

// Changement d'équipe d'un joueur
router.put('/player/update', async (req, res) => {
    console.log('Through /player/update');

    try {
        let id_vr = req.body.id_vr;
        let team = await bdd.teams.findByPk(team_name);
        team.addPlayers({ id_vr: id_vr })

        if (wss.Clients[id_vr]) {
            wss.Clients[id_vr].send(JSON.stringify(team));
        };

        return res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    };
});

// Donne toutes les infos de l'auth sur l'utilisateur connecté (format --> https://auth.viarezo.fr/docs/authorization_code)
router.get('/player/whoami', async (req, res) => {
    console.log('Through /player/whoami');

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


// Fonctionnalités liées à la gestion d'équipe

// Création d'une nouvelle équipe
router.post('/team/create', async (req, res) => {
    console.log('Through /team/create');

    let id_vr_list = req.body.members.split(";");
    try {
        let team = await bdd.teams.create({ team_name: req.body.team_name });
        for (let id_vr of id_vr_list) {
            await bdd.players.upsert({ id_vr: id_vr, team_name: team.team_name }, { where: { id_vr: id_vr } });
            if (wss.Clients[id_vr]) {
                wss.Clients[id_vr].send(JSON.stringify(team));
            };
        };
        return res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    };
});

// Validation d'une équipe par un administrateur
router.post('/team/validate', async (req, res) => {
    console.log('Through /team/validate');

    try {
        let team = await bdd.teams.findByPk(req.body.team_name, { include: [{ model: bdd.players, as: 'players'}]});
        await bdd.history.create({ team_name: team.team_name, activity_name: "En attente d'activité" });
        team.ongoing_activity = await algo.next_chall(req.body.team_name);
        team.save();

        for (let player of team.players) {
            if (wss.Clients[player.id_vr]) {
                wss.Clients[player.id_vr].send(JSON.stringify(team));
            };
        };

        return res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    };
});

// récupération de la liste de toutes les équipes et de leurs joueurs
router.get('/team/all', async (req, res) => {
    console.log('Through /team/all');

    try {
        let teams = await bdd.teams.findAll({ include: [{ model: bdd.players, as: 'players' }] });
        return res.json(teams);
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    };
});

// Cette route récupère les équipes présentes sur un activité
router.get('/team/admin/:activity', async (req, res) => {
    console.log('Through /team/admin/:activity');

    try {
        let activity = await bdd.activities.findByPk(req.params.activity, { include: [{ model: bdd.teams, as: "teams" }]});
        res.json(activity.teams);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    };
});

// Ajout de points bonus
router.put('/team/bonus', async (req, res) => {
    console.log('Through /team/bonus');

    let team_name = req.body.team_name;
    let bonus = parseInt(req.body.bonus, 10);
    try {
        let team = await bdd.teams.findByPk(team_name, { include: [{ model: bdd.admins, as: "admins" }]});
        team.points = team.points + bonus;
        team.save();

        for (let admin of team.admins) {
            if (wss.Clients[admin.id_vr]) {
                wss.Clients[admin.id_vr].send(JSON.stringify(team));
            };
        };

        return res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

// Arrêt du timer et MAJ du temps
router.put('/team/stop', async (req, res) => {
    let team_name = req.body.team_name
    let temps = new Date()
    try {
        let team = await bdd.teams.findByPk(team_name, { include: [{ model: bdd.admins, as: "admins" }]});
        team.timer_last_on = temps;
        team.timer_status = !team.timer_status;
        if (team.timer_status) {
            var diff = (temps.getTime() - team.timer_last_on.getTime()) / 1000;
            team.time = team.time + diff;
        }
        team.save();
        
        for (let admin of team.admins) {
            if (wss.Clients[admin.id_vr]) {
                wss.Clients[admin.id_vr].send(JSON.stringify(team));
            };
        };

        return res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(500).end();
    };
});

// Récupération des informations concernant l'équipe donnée
router.get('/team/:team_name', async (req, res) => {
    console.log('Through /team/:team_name');

    try {
        let team = await bdd.teams.findByPk(req.params.team_name, { include: [{ model: bdd.activities, as: "activity" }]});
        res.json(team);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    };
});

// Récupère les informations concernant l'activité demandée
router.get('/activity/:name', async (req, res) => {
    console.log('Through /activity/:name');

    try {
        let activity = await bdd.activities.findByPk(req.params.name);
        res.json(activity);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    };
});

// Met à jour l'activité après avoir passé une épreuve
router.put('/team/next', async (req, res) => {
    console.log('Through /team/next');

    try {
        let team = await bdd.teams.findByPk(req.body.team_name, { include: [
            { model: bdd.activities, as: "activity" }, 
            { model: bdd.admins, as: "admins" }, 
            { model: bdd.players, as: "players" },
        ]});
        await bdd.history.create({ team_name: team.team_name, activity_name: team.activity.name });
        team.ongoing_activity = await algo.next_chall(team.team_name);
        team.save();
        
        for (let player of team.players) {
            if (wss.Clients[player.id_vr]) {
                wss.Clients[player.id_vr].send(JSON.stringify(team_info));
            };
        };
        for (let admin of team.admins) {
            if (wss.Clients[admin.id_vr]) {
                wss.Clients[admin.id_vr].send(JSON.stringify(team_info));
            };
        };

        res.status(200).end();
    } catch (e) {
        console.log(e);
        res.status(500).end();
    };
});


// Autre exemple de routes

// Redirection vers la page d'accueil
router.get('/connect', (req, res, next) => {
    console.log('Through /connect');
    res.redirect(config.WEBROOT);
});

// Cette route récupère n'importe quelle autre requête GET et renvoie un Hello World
router.get('/:nimp', (req, res, next) => {
    console.log('Through /:nimp');
    res.json('Hello world');
});

module.exports = router;
