const express = require('express');
const bcrypt = require('bcrypt');
const restricted = require('../auth/restricted-middleware.js');

const db = require('../data/db-config.js');
const Users = require('./users-model.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let { username, password } = req.body;
    console.log(req.body)
    const hash = bcrypt.hashSync(password, 8); // it's 2 ^ 8, not 8 rounds
    Users.add({ username, password: hash })
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
    const user = req.body
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
  
  router.get('/', (req, res) => {
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

//   {
//     "username": "chrisrobin",
//     "password": "burgers",
// 		"lastName": "stewart",
// 		"firstName": "chris",
//     "email": "legacy@gmail.com",
//     "phone": "5555555555",
//     "address": "3315 S 12 St, tacoma, wa 98405"
//   }