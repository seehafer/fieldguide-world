var express = require('express'),
  router = express.Router(),
  _ = require('underscore')._;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Field Guide to the World'
  });
});
