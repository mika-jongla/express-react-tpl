var express       = require("express");
var cookieParser  = require("cookie-parser");
var cookieSession = require("cookie-session");
var bodyParser    = require("body-parser");

// Session related middleware
var session = require("server/middleware").session;

function index(req, res) {
  res.render("site/app.hbs");
}

function login(req, res) {
  var sess = session.exists(req);

  if (sess) {
    index(null, res);
    return;
  }

  res.render("site/login.hbs");
}

function setup(app) {
  // Serve static files from www/
  app.use(express.static(__dirname + "/../../www"));

  // Setup cookie and session stuff
  var SECRET = 'x41gn0j';
  app.use(cookieParser(SECRET));

  var opts = {
    secret:      SECRET,
    secureProxy: false    // set true if you use SSL with Nginx proxy
  };
  app.use(cookieSession(opts)); 
  app.use(session.message);

  // Required for parsing POST data
  app.use(bodyParser.urlencoded({ extended: false }));  
  
  app.get('/', session.need, index);
  app.get('/log-in', login);
  app.get('/log-out', session.logout);
  
  app.post('/log-in', session.login);
}

module.exports = setup;
