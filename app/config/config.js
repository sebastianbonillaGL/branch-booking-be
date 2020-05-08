var lodash = require('lodash');

var config = {
  dev: 'development',
  prod: 'production',
  port: process.env.PORT || 3000,
  expireTime: "7d",
  secrets: {
    jwt: process.env.JWT || 'gumball'
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = lodash.merge(config, envConfig);
