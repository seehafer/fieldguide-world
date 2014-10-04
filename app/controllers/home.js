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
    
    Bird.colors(function (err, colors) {
      res.render('index', {
        title: 'Pocket Doug',
        birds: birds,
        colors: colors
      });
    });
  });
});

router.get('/add/', function (req, res, next) {
  Bird.colors(function (err, colors) {
    res.render('add', {
      colors: colors
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
