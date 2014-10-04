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

router.get('/add/', function (req, res, next) {
  Bird.colors(function (err, colors) {
    if (err) return next(err);
    Bird.sizes(function (err, sizes) {
      if (err) return next(err);
      res.render('add', {
        colors: colors,
        sizes: sizes
      });
    });
  });
});

router.post('/add/', function (req, res, next) {
  console.log(req.body);
  var bird = new Bird(req.body);
  bird.save();
  console.log(bird);
  res.redirect('/');
});

router.get('/bird/', function (req, res, next) {
  Bird.find(function (err, birds) {
    res.json(birds);
  })
});
