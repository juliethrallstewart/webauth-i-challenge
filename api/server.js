const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session) //must come after session so we can curry session
const dbConnection = require('../data/db-config')

const UsersRouter = require('../users/users-router.js');
const SignupRouter = require('../signup/signup-router.js')
const LoginRouter = require('../login/login-router.js')



const server = express();

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

server.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    callback(null, true);
  }}))

const sessionConfig = {
    name: 'chocochip', //would name the cookie session id by default
    secret: process.env.SESSION_SECRET || 'keeo it secret keep it safe',
    cookie: {
      maxAge: 1000 * 60 * 60,// in milliseconds
      secure: false, //true means only send cookie over https, we want this to be true in productions using process.env
      httpOnly: true, //true means JS has no access to the cookie
    },
    resave: false,
    saveUninitialized: true, //GDPR compliance --> that popup asking if cookies are cool on websites, agreeing allows you to be tracked
  //to stop tracking use third party cookie blocking in browser, or use ad-blocker
    store: new KnexSessionStore({
      knex: dbConnection, //pass dbConnection as the knex key
      tablename: 'knexsessions',
      sidfieldname: 'sessionid',
      createtable: true,
      clearInterval: 1000 * 60 * 30, //clean out expired session data
    }) 
  }

  // const corsConfig  = {
  //   origin: 'http://localhost:3000',
  //   optionsSuccessStatus: 200,
  //   credentials: true
  // }

server.use(helmet());
server.use(express.json())
// server.use(cors());
// server.use(cors(corsConfig))


// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http:localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

server.use(session(sessionConfig))

server.use('/api/users', UsersRouter)
server.use('/api/auth', SignupRouter)
server.use('/api/auth', LoginRouter)


server.get('/', (req, res) => {
    res.send('Welcome to my Users!')
})

module.exports = server;