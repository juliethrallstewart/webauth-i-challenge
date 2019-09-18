const express = require('express');
const bcrypt = require('bcrypt');
const middleware = require('../auth/restricted-middleware.js');

const db = require('../data/db-config.js');
const Signup = require('./signup-model.js');

const router = express.Router();

router.post('/signup', (req, res) => {
    let { username, password, lastName, firstName, email, address, phone } = req.body;
    console.log(req.body)
    const hash = bcrypt.hashSync(password, 8); // it's 2 ^ 8, not 8 rounds
    Signup.add({ username, password: hash, lastName, firstName, email, phone, address })
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
// without auth

  // router.post('/', (req, res) => {
  //   const newUser = req.body
  //   Signup.add(newUser)
  //     .then(saved => {
  //       res.status(201).json(saved);
  //     })
  //     .catch(error => {
  //       res.status(500).json(error);
  //     });
  // });
  // {
  //   "username": "chrisrobin",
  //   "password": "burgers",
	// 	"lastName": "stewart",
	// 	"firstName": "chris",
  //   "email": "legacy@gmail.com",
  //   "phone": "5555555555",
  //   "address": "3315 S 12 St, tacoma, wa 98405"
  // }

module.exports = router;