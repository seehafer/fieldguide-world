console.log(Isotope);
$( function() {
  // init Isotope
  var $container = $('#items').isotope({
    itemSelector: '.bird',
    layoutMode: 'masonry',
  });
});