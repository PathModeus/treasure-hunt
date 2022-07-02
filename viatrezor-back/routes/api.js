const express = require('express');
const router = express.Router();
const bdd = require('../models/db');
const algo = require('../src/diverse/algo');
const config = require('../config.json');

// wss.on('connection', (client) => {
//     //connection is up, let's add a simple simple event
//     wss.on('message', (message) => {
//         // const parseMsg  = Json.parse(message);
//         // clients.saveClient(parseMsg, client)
//         //log the received message and send it back to the client
//         console.log('received: %s', message); 
//     });
//     //send immediatly a feedback to the incoming connection    
//     wss.send('Hi there, I am a WebSocket server');
// });


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
            await bdd.history.create({ team_name: team.team_name, activity_id: 1 })
            let activity_id = await algo.next_chall(team.team_name);
            bdd.teams.update({ ongoing_activity: activity_id }, { where: { team_name: team.team_name } })
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


// router.put('/team/next_activity/:ongoing_activity', (req,res) => {
    
//     let team_id = req.body.team_id
//     let ongoing_activity =  req.params.activity
//     let next_activity = req.body.next_activity
//     try {
//         team =  bdd.teams.findAll({where: {team_id: team_id}})
//         bdd.teams.update({ongoing_activity: next_activity}, {where: {team_id: team_id}})
//         bdd.activities.upsert({team_id: team_id, $ongoing_activity: 1}, {where: {team_id: team_id}})
//         team.ongoing_activity =  next_activity;

//         for (const [key, value] of Object.entries(wss.Clients)) {

//             if (team.ongoing_activity == value[0])
//             {
//                 console.log("key")                    
//                 value[1].send(JSON.stringify( team ));
//             }
    
    
//               }

//     }
//     catch (e) {
//         console.log(e);
//         res.status(500).end();
//     }
// })


router.put('/team/bonus', async (req, res) => {
    let wss = require("../server")
    let team_name = req.body.team_name
    let bonus_str = req.body.bonus
    let bonus = parseInt( bonus_str, 10)
    try {
        team = (await bdd.teams.findAll({where: {team_name: team_name}}))[0]
        console.log(team.dataValues.points)
        bdd.teams.update({points: team.dataValues.points + bonus}, {where: {team_name: team_name}})
        res.json('Bonus accordé !')
        team.points =  team.dataValues.points + bonus;

    for (const [key, value] of Object.entries(wss.Clients)) {
        if (team.ongoing_activity == value[0])
        {
            console.log("key")                    
        value[1].send(JSON.stringify( team ));
        }


          }
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

// Arrêt du timer et MAJ du temps

router.put('/team/stop', async (req, res) => {
    const wss = require('../server');

    let team_id = req.body.team_id
    let temps = Date.now()
    let date = new Date;
    date.setHours(date.getHours() +2 );
    try {
        team = (await bdd.teams.findAll({where: {team_id: team_id}}))[0]
        let time = team.time;
        if (!team.timer_status) {
            bdd.teams.update({timer_last_on: date, timer_status: 1}, {where: {team_id: team_id}})
        } else {
            var dif = ( temps - team.timer_last_on.getTime() +2*60*60*1000 ) / 1000;  // bug de timezone
            time = time + dif;
            console.log( team.timer_last_on.getHours(), team.timer_last_on.getMinutes())
             bdd.teams.update({time: team.time+ dif, timer_last_on: date, timer_status: 0}, {where: {team_id: team_id}})
        }
        res.json({time: time, date:date, status:!team.timer_status});
        team = (await bdd.teams.findAll({where: {team_id: team_id}}))[0]
    for (const [key, value] of Object.entries(wss.Clients)) {
        
        if (team.ongoing_activity == value[0])
        {
            value[1].send(JSON.stringify( team ));
        }


          }
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})

// // Cette route récupère les équipes présentes sur un activité
router.get('/team/admin/:activity', async (req, res) => {
    try{
        team = (await bdd.teams.findAll({where: {ongoing_activity: req.params.activity}}));
        res.json(team);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
})
// Vérification des droits de l'utilisateur

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