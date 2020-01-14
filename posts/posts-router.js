const router = require('express').Router();
const db = require('../data/db.js');

router.post('/', (req, res) => {
    if (req.body.title === undefined){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else{
        db.insert(req.body)
            .then(newPost => {
                res.status(201).json(newPost);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            })
    }
})

router.post('/:id/comments', (req, res) => {
    db.findById(req.params.id)
        .then(output => {
            if (output.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else{
                if (req.body.text === undefined){
                    res.status(400).json({ errorMessage: "Please provide text for the comment." });
                } else{
                    db.insertComment(req.body)
                        .then(commentId => {
                            res.status(201).json(commentId);
                        })
                        .catch(err => {
                            res.status(500).json({ error: "There was an error while saving the post to the database" });
                        })
                }
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
})

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(output => {
            if (output.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else{
                res.status(200).json(output);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
        .then(output => {
            if (output.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else{
                res.status(200).json(output);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        })
})

router.delete('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(output => {
            if (output.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else{
                db.remove(req.params.id)
                    .then(rmOutput => {
                        res.status(200).json(rmOutput);
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The post could not be removed" });
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" });
        })
})

router.put('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(output => {
            if (output.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else{
                if (req.body.title === undefined || req.body.contents === undefined){
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
                } else{
                    db.update(req.params.id, req.body)
                        .then(reply => {
                            res.status(200).json(reply);
                        })
                        .catch(err => {
                            res.status(500).json({ error: "There was an error while saving the post to the database" });
                        })
                }
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." });
        })
})

module.exports = router;