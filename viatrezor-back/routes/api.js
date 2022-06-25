const express = require('express');
const router = express.Router();
const bdd = require('../models/db');


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
    var user = req.session.user

    bdd.players.bulkCreate([{id_vr: user.login}], {ignoreDuplicates: true}).catch((e) => {
        console.log(e)
    })
    return res.redirect('http://localhost:3000/login')
})

// Fonctionnalités liées à la gestion d'équipe

// Création d'équipe

router.post('/team/create', async (req, res) => {
    // Il faut que le front envoie les champs membres et nom d'équipe d'un coup
    if (req.body.members.includes(";")) {
        let id_vr_list = req.body.members.split(";");
        try {
            team = await bdd.teams.create({team_name: req.body.team_name});
            for (let id_vr of id_vr_list) {
                bdd.players.upsert({id_vr: id_vr, team_id: team.team_id}, {where: { id_vr: id_vr }});
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

router.put('/team/bonus', (req, res, next) => {
    let team_name = req.body.team_name
    let bonus = req.body.bonus
    bdd.query('SELECT points FROM teams WHERE team_name = (?)', [team_name], (err, rows, fields) => {
        if (err) throw err
        bdd.query('UPDATE teams SET points = (?) WHERE team_name = (?)', [rows[0] + bonus, team_name], (err) => {
            if (err) throw err
            res.json('Bonus accordé !')
        })
    })
})

// Arrêt du timer et MAJ du temps

router.post('/team/stop', async (req, res) => {
    var team_name = req.body.team_name
    var date = new Date()
    var temps = date.now()
    try {
        team = (await bdd.teams.findAll({where: {team_name: team_name}}))[0]
        if (team.timer_status) {
            bdd.teams.update({time: team.time + temps - team.timer_last_on, timer_last_on: temps, timer_status: 0}, {where: {team_name: team_name}})
        } else {
            res.json('Timer déjà arrêté !')
        }
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

// Renvoie les informations de l'équipe concernée

router.get('/team/:id', async (req, res) => {
    try{
        team = (await bdd.teams.findAll({where: {team_id: req.params.id}}))[0];
        res.json(team);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

// Donne toutes les infos de l'auth sur l'utilisateur connecté (format --> https://auth.viarezo.fr/docs/authorization_code)

router.get('/whoami', async (req, res) => {
    let user = req.session.user
    try {
        admin = (await bdd.admins.findAll({where: {id_vr: user.login}}))
        player = (await bdd.players.findAll({where: {id_vr: user.login}}))
        return res.json({...req.session.user, role: {
            admin: admin ? admin[0].asso_name : null, 
            player: player ? player[0].team_id : null
        }});
    } catch (e) {
        console.log(e);
        res.status(500).json({...req.session.user, role: {
            admin: null, 
            player: null
        }});
    }
});

router.get('/connect', (req, res, next) => {
    res.redirect('http://localhost:3000')
})

// Cette route récupère n'importe quelle autre requête GET et renvoie un Hello World

router.get('/:nimp', (req, res, next) => {
    res.json('Hello world')
});

module.exports = router;

// Si certain players ne se sont jamais connectes avant d'être ajouté à une équipe échec : pareil si c'est un admin