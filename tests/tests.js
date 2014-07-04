(function( $, window ) {
	var Pym, $doc, $instance, instance, commonSetup, commonTeardown, config;

	$doc = $( document );

	Pym = window.componentNamespace.Pym;

	commonSetup = function() {
		instance = new Pym( $("[data-pym]")[0] );
	};
	commonTeardown = function() {};

	module( "constructor", {
		setup: commonSetup,
		teardown: commonTeardown
	});

	test( "uses defaults", function() {
    var overrides;

    for( var property in Pym.defaults ) {
      equal( instance[property], Pym.defaults[property] );
    }
	});

	test( "override defaults", function() {
    var overrides;

		instance = new Pym( $("[data-pym]")[0], overrides = {
			scaleFactor: 2,
			buttonText: "foo",
			zoomedButtonText: "bar",
			class: "baz",
			zoomedClass: "bak"
		});

    for( var property in Pym.defaults ) {
      equal( instance[property], overrides[property] );
    }
	});
})( jQuery, this );
