const express = require('express');

// routers

const postsRouter = require('./posts/posts-router.js');

//

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({its: 'working'});
})

server.use('/posts', postsRouter);

module.exports = server;