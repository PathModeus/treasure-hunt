const express = require('express');
const router = express.Router();


router.get('/infos', (req, res, next) => {
    res.send(res.session.user)
});

router.get('/:id', (req, res, next) => {
    res.json('Hello world')
});

router.get('/', (req, res, next) => {
    console.log(req.session.user)
})

module.exports = router;