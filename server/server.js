#!/usr/bin/env node
var config  = require("server/config");
var express = require("express");
var app     = express();

// When behind Nginx
//app.enable('trust proxy');

// Templating, uses consolidate to support other than jade
var cons = require('consolidate');

// Add handlebars support - the templates must specify the
// extension as .hbs
app.engine('hbs', cons.handlebars);

// Templating
app.set("views", __dirname);

// Jade is the default engine. No need to specify the
// extension
app.set("view engine", "jade");

// Load the routes
[
  "server/site/routes"
].forEach(function (routePath) {
  require(routePath)(app);
});

// Error handlers
app.use(require("server/middleware").notFound);

app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    console.log("Unable to listen for connections", error);
    process.exit(10);
  }

  console.log("Running environment: " + (
    config.env.development 
      ? "development" 
      : "production"
    )
  );
  
  console.log("Express listening on http://" +
    config.express.ip + ":" + config.express.port);
});