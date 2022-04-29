const express = require('express');
const router = express.Router();



router.post('/infos', (req, res, next) => {
    try {
        console.log(req.session.user)
    }
    catch (error) {
        console.log('Dommage')
    }
});

router.get('/:id', (req, res, next) => {
    if (req.params.id === '15') console.log('Trop stylé')

    else console.log('beep boop')

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