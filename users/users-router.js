const express = require('express');
const bcrypt = require('bcrypt');
const restricted = require('../auth/restricted-middleware.js');

//for dummy commit
const db = require('../data/db-config.js');
const Users = require('./users-model.js');

const router = express.Router();

router.post('/api/register', (req, res) => {
    let { username, password } = req.body;
  
    const hash = bcrypt.hashSync(password, 8); // it's 2 ^ 8, not 8 rounds
  
    Users.add({ username, password: hash })
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    const user = req.body
    // console.log(user)
    Users.findBy({ username })
      .first()
      .then(user => {
        console.log(user, 'logging user')
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'You cannot pass!' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.get('/api/users', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  
  router.get('/hash', (req, res) => {
    const name = req.query.name;
  
    // hash the name
    const hash = bcrypt.hashSync(name, 8); // use bcryptjs to hash the name
    res.send(`the hash for ${name} is ${hash}`);
  });

  module.exports = router;

