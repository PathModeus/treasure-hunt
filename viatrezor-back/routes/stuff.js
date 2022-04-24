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
    console.log(req.params)
});

router.put('/:id', (req, res, next) => {
});

router.delete('/:id', (req, res, next) => {
});

router.get('/' +
    '', (req, res, next) => {
        console.log('Hello World')
    });

module.exports = router;