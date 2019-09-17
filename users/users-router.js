const express = require('express');
const bcrypt = require('bcrypt');
const restricted = require('../auth/restricted-middleware.js');

const db = require('../data/db-config.js');
const Users = require('./users-model.js');

const router = express.Router();

    
  router.get('/', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(error => {
        if (error) {
          res.status(500).json({message: 'you can check out but can\'t leave!'})
        } else {
          res.status(200).json({message: 'bye'})
        }
      });
    } else {
      res.status(200).json({message: 'already logged out'})
    }
  })
  
module.exports = router;