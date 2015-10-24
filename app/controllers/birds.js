var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Bird = mongoose.model('Bird'),
  _ = require('underscore')._;

module.exports = function (app) {
  app.use('/birds/', router);
};

router.get('/', function (req, res, next) {

  Bird.find(function (err, birds) {
    if (err) return next(err);

    Bird.colors(function (err, colors) {
      res.render('birds', {
        title: 'Field Guide to the World | Birds',
        birds: birds,
        colors: colors
      });
    });
  });
});

var renderForm = function (req, res, next, data) {
  data = data || {};
  Bird.colors(function (err, colors) {
    if (err) return next(err);
    Bird.sizes(function (err, sizes) {
      if (err) return next(err);
      data.bird = data.bird || new Bird();
      res.render('forms/bird', _.extend({
        colors: colors,
        sizes: sizes
      }, data));
    });
  });
}

router.get('/add/', function (req, res, next) {
  renderForm(req, res, next);
});

router.post('/add/', function (req, res, next) {
  var bird = new Bird(req.body);
  bird.save();
  res.redirect('/');
});

router.get('/edit/:id/', function (req, res, next) {
  Bird.findById(req.params.id, function (err, bird) {
    renderForm(req, res, next, {bird: bird});
  })
});

router.post('/edit/:id/', function (req, res, next) {
  Bird.findByIdAndUpdate(req.params.id, req.body, function (err, bird) {
    renderForm(req, res, next, {bird: bird});
  })
});


// JSON API

// router.get('/bird/', function (req, res, next) {
//   Bird.find(function (err, birds) {
//     res.json(birds);
//   })
// });
