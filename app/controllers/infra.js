var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Infra = mongoose.model('Infra'),
  _ = require('underscore')._;

module.exports = function (app) {
  app.use('/infrastructure/', router);
};

router.get('/', function (req, res, next) {
  Infra.find(function (err, infras) {
    if (err) return next(err);
    res.render('infra', {
      title: 'Pocket Doug',
      infras: infras
    });
  });
});

var renderForm = function (req, res, next, data) {
  data = data || {};
  Infra.sizes(function (err, sizes) {
    if (err) return next(err);
    data.infra = data.infra || new Infra();
    res.render('form', _.extend({
      sizes: sizes
    }, data));
  });
}

router.get('/add/', function (req, res, next) {
  renderForm(req, res, next);
});

router.post('/add/', function (req, res, next) {
  var infra = new Infra(req.body);
  infra.save();
  res.redirect('/');
});

router.get('/edit/:id/', function (req, res, next) {
  Infra.findById(req.params.id, function (err, infra) {
    renderForm(req, res, next, {infra: infra});
  })
});

router.post('/edit/:id/', function (req, res, next) {
  Infra.findByIdAndUpdate(req.params.id, req.body, function (err, infra) {
    renderForm(req, res, next, {infra: infra});
  })
});


// JSON API

// router.get('/infra/', function (req, res, next) {
//   Infra.find(function (err, infras) {
//     res.json(infras);
//   })
// });
