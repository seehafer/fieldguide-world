var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Bird = mongoose.model('Bird');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  Bird.find(function (err, birds) {
    if (err) return next(err);
    res.render('index', {
      title: 'Pocket Doug',
      birds: birds
    });
  });
});

router.get('/bird/', function (req, res, next) {
  Bird.find(function (err, birds) {
    res.json(birds);
  })
});
