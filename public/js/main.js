console.log(Isotope);
$(window).load( function() {
  // init Isotope
  var $container = $('#items').isotope({
    itemSelector: '.bird',
    layoutMode: 'masonry',
  });
  
  $('#size-filter').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });
  
  // change active class on buttons
  $('.btn-group-vertical').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.active').removeClass('active');
      $( this ).addClass('active');
    });
  });
  

  var Bird = Backbone.Model.extend();
  Bird.Collection = Backbone.Collection.extend({
    model: Bird,
    url: '/bird/'
  });

  var birds = new Bird.Collection();
  birds.fetch();

});
