


$(window).load( function() {
  // init Isotope
  var $container = $('#items').isotope({
    itemSelector: '.photo',
    layoutMode: 'masonry',
    getSortData: {commonality: '[data-commonality] parseInt'},
    sortBy: 'commonality',
    sortAscending: false
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

  $('body').on( 'click', 'button.verticalbtn', function() {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this.parents('.btn-group-vertical');
    var filterGroup = $buttonGroup.attr('id');
    // set filter for group
    filters[ filterGroup ] = $this.attr('data-filter');
    // combine filters
    var filterValue = '';
    for ( var prop in filters ) {
      filterValue += filters[ prop ];
    }
    // set filter for Isotope
    if (filterValue == "**") filterValue = "*";
    $container.isotope({ filter: filterValue });
  });
  
  $('body').on( 'click', 'a.droplink', function() {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this.parents('.btn-group');
    var filterGroup = $buttonGroup.attr('id');
    // set filter for group
    filters[ filterGroup ] = $this.attr('data-filter');
    // combine filters
    var filterValue = '';
    for ( var prop in filters ) {
      filterValue += filters[ prop ];
    }
    // set filter for Isotope
    if (filterValue == "**") filterValue = "*";
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

  $('img').capty({ animation: 'fade', speed: 100});

  $('.photo_link').popover({container: 'body', html: true}); // fun-facts

  // var Bird = Backbone.Model.extend();
  // Bird.Collection = Backbone.Collection.extend({
  //   model: Bird,
  //   url: '/bird/'
  // });

  // var birds = new Bird.Collection();
  // birds.fetch();

});
