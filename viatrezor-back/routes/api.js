const express = require('express');
const router = express.Router();


router.get('/whoami', (req, res) => {
    return res.json(req.session.user);
});

router.get('/connect', (req, res, next) => {
    console.log('goiheroigspr')
    res.redirect('http://localhost:3000')
})

router.get('/infos', (req, res, next) => {
    console.log('arrivé')
    res.send(res.session.user)
});

router.get('/:id', (req, res, next) => {
    console.log('requête reçue !')
    res.send(`Omaewamu Shin Deiru ${req.params.id}`)
    console.log('Réponse envoyée')

});

router.get('/', (req, res, next) => {
    console.log(req.session.user)
})

router.put('/:id', (req, res, next) => {
});

router.delete('/:id', (req, res, next) => {
});

router.get('/' +
    '', (req, res, next) => {
        console.log('Hello World')
    });

module.exports = router;