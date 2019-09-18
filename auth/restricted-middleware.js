const bcrypt = require('bcrypt');

const Users = require('../users/users-model.js');

// used with headers and not 
// npm i express-session 
// npm i connect-session-knex

// module.exports = (req, res, next) => {
//   let { username, password } = req.headers;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         next();
//       } else {
//         res.status(401).json({ message: 'You cannot pass!' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// };

// module.exports = (req, res, next) => {
//   console.log(req.session.user)
//   if (req.session && req.session.user) {
//     next();

//   } else {
//     res.status(401).json({message: 'you shall not pass!'})
//   }
// }

const middleware = {

  restricted: ((req, res, next) => {
    if (req.session && req.session.user) {
      next();
  
    } else {
      res.status(401).json({message: 'you shall not pass!'})
    }
  }),

}

module.exports = middleware;

function fetch() {
  const reqOptions = {
    headers: {
      username: '',
      password: '',
    },
  };

  // axios.get(url, reqOptions).the().catch()
  // axios.post(url, data, reqOptions).the().catch()
}
