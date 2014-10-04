var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pocketdoug'
    },
    port: 3000,
    db: 'mongodb://localhost/pocketdoug-development'

  },

  test: {
    root: rootPath,
    app: {
      name: 'pocketdoug'
    },
    port: 3000,
    db: 'mongodb://localhost/pocketdoug-test'

  },

  production: {
    root: rootPath,
    app: {
      name: 'pocketdoug'
    },
    port: 80,
    db: process.env.MONGOLAB_URI
  }
};

module.exports = config[env];
