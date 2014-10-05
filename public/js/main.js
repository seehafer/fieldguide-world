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

  $('body').on('click', 'div.bird', function (e) {
    window.location.href = '/edit/' + $(e.currentTarget).data('id') + '/';
  })


  // var Bird = Backbone.Model.extend();
  // Bird.Collection = Backbone.Collection.extend({
  //   model: Bird,
  //   url: '/bird/'
  // });

  // var birds = new Bird.Collection();
  // birds.fetch();

});
