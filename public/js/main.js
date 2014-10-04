console.log(Isotope);
$( function() {
  // init Isotope
  var $container = $('#items').isotope({
    itemSelector: '.bird',
    layoutMode: 'masonry',
  });

  var Bird = Backbone.Model.extend();
  Bird.Collection = Backbone.Collection.extend({
    model: Bird,
    url: '/bird/'
  });

  var birds = new Bird.Collection();
  birds.fetch();

});
