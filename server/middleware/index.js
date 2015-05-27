// Our user database :)
var USERS = {
  'foo': {name: 'foo', pswd: 'bar123'}
};

// Private
function authUser(name, pswd, fn) {
  var user = USERS[name];

  if(!user) {
    return fn('cannot find user');
  }

  if (user.pswd == pswd) {
    return fn(null, user);
  }

  fn('invalid password');
}

function sessionNeed(req, res, next) {
  if (sessionExists(req)) {
    next();
    return;
  }
  res.redirect("/log-in");
}

function sessionExists(req) {
  return !!(req.session && req.session.user);
}

// Session-persisted message middleware
function sessionMessage(req, res, next){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  var err = req.session.error                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    , msg = req.session.success; 

  delete req.session.error;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  delete req.session.success;

  // Variables available to the views rendered during
  // the session life time
  res.locals.message = '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  if (err) res.locals.message = {msg: err, type: 'error'};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  if (msg) res.locals.message = {msg: msg, type: 'success'}; 

  next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
}

function sessionLogin(req, res) {
  var name = req.body.username
    , pswd = req.body.password
    , remember = req.body.remember;
  
  authUser(name, pswd, function(err, user){
    if (user) {
      req.session.user = user;
      req.session.success = 'Authenticated as ' + user.name;

      // 'Remember me' by setting session age to one year
      var YEAR = 365 * 24 * 60 * 60 * 1000;
      req.sessionOptions.maxage = remember ? YEAR : 0;
      req.session.save();

      res.redirect('/');
    } else {
      req.session.error = 'Authentication failed';
      res.redirect('/log-in');
    }
  });
}

function sessionLogout(req, res) {
  req.session = null;
  res.redirect('/');
}

function notFound(req, res) {
  res.status(404).render("errors/not-found.hbs");
}

module.exports = {
  notFound: notFound,
  session: {
    need:    sessionNeed,
    exists:  sessionExists,
    message: sessionMessage,
    login:   sessionLogin,
    logout:  sessionLogout
  }
};

