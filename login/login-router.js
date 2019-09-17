const express = require('express');
const bcrypt = require('bcrypt');
const restricted = require('../auth/restricted-middleware.js');

const db = require('../data/db-config.js');
const Login = require('./login-model.js');

const router = express.Router();

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    const user = req.body
    console.log(user)
    Login.findBy({ username })
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


//without auth
//   router.post('/', (req, res) => {
//     let { username, password } = req.body;
//     Login.findBy({ username })
//       .first()
//       .then(user => {
//         console.log(user, 'logging user')
//         if (user) {
//           res.status(200).json({ message: `Welcome ${user.username}!` });
//         } else {
//           res.status(401).json({ message: 'You cannot pass!' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   });

//   {
//     "username": "julieerin",
//     "password": "chocolate"
//   }

  module.exports = router;