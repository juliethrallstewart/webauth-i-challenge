const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const UsersRouter = require('../users/users-router.js');


const server = express();

server.use(helmet());
server.use(express.json())
server.use(cors());

server.use('/api/users', UsersRouter)

server.get('/', (req, res) => {
    res.send('Welcome to my Users!')
})

module.exports = server;