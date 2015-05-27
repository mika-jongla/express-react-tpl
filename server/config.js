var config = module.exports;

var PRODUCTION = process.env.NODE_ENV === "production";
var DEVELOPMENT = process.env.NODE_ENV === "development";

// Defaults to development
if (process.env.NODE_ENV === undefined) {
  DEVELOPMENT = true;
}

config.env = {
  development: DEVELOPMENT,
  production: PRODUCTION
};

config.express = {
  port: process.env.EXPRESS_PORT || 7001,
  ip: "0.0.0.0"
};