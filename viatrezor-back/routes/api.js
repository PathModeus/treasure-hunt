const express = require('express');
const router = express.Router();



router.post('/', (req, res, next) => {
    const thing = "Hello"

        .then(
            () => {
                res.status(201).json({
                    message: 'Post saved successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
});

router.get('/:id', (req, res, next) => {
    if (req.params.id === '15') console.log('Trop stylé')

    else console.log('beep boop')

});

router.get('/infos', (req, res, next) => {
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