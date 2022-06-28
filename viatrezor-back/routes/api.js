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

router.put('/team/bonus', (req, res) => {
    console.log(req.body)
    let team_name = req.body.team_name
    let bonus_str = req.body.bonus
    let bonus = parseInt( bonus_str, 10)
    try {
        team = (await bdd.teams.findAll({where: {team_name: team_name}}))[0]
        bdd.teams.update({points: team.points + bonus}, {where: {team_name: team_name}})
        res.json('Bonus accordé !')
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }

})

//Changement d'activité

router.put('/team/next_activity', (req,res) => {
    let team_name = req.body.team_name
    let ongoing_activity = req.body.next_activity
    try
    {
    bdd.teams.update({ongoing_activity: ongoing_activity}, {where: {team_name: team_name}})
    if (err) throw err
        bdd.query('SELECT team_id FROM teams WHERE team_name = (?)' , [team_name], (err, rows, fields) => {
            console.log(rows[0])
            if (err) throw err
            console.log(rows[0])
            bdd.query('UPDATE activities SET activity_2 = 1 WHERE team_id = (?)', [rows[0].team_id], (err) => {
                if (err) throw err
                res.json('Equipe envoyée vers la prochaine activité')
            })
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

// // Cette route récupère les équipes présentes sur un activité
router.get('/team/admin/:activity', async (req, res) => {
    console.log( req.params)
    try{
        team = (await bdd.teams.findAll({where: {ongoing_activity: req.params.activity}}));
        console.log(team)
        res.json(team);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})
// Vérification des droits de l'utilisateur

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
            admin: admin[0] ? admin[0].asso_name : null, 
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