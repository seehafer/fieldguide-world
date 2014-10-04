console.log(Isotope);
$(window).load( function() {
  // init Isotope
  var $container = $('#items').isotope({
    itemSelector: '.bird',
    layoutMode: 'masonry',
  });
  
  var filters = {};
  
 /* $('#size-filter').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });
  
  $('#color-filter').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    $container.isotope({ filter: filterValue });
  }); */
  
  $('.container').on( 'click', 'button', function() {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this.parents('.btn-group-vertical');
    var filterGroup = $buttonGroup.attr('id');
    // set filter for group
    filters[ filterGroup ] = $this.attr('data-filter');
    // combine filters
    var filterValue = '';
    var i = 0;
    for ( var prop in filters ) {
      if (i > 0 && i != filters.length-1) filterValue += ",";
      filterValue += filters[ prop ];
      i++;
    }
    // set filter for Isotope
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
