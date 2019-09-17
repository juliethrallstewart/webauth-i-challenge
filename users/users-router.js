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
  
module.exports = router;