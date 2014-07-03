(function( $, window ) {
  var Pym, $doc, $instance, instance, commonSetup, commonTeardown, config;

  $doc = $( document );

  Pym = window.componentNamespace.Pym;

  commonSetup = function() {};
  commonTeardown = function() {};

  module( "constructor", {
    setup: commonSetup,
    teardown: commonTeardown
  });
})( jQuery, this );
