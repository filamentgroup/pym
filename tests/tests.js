(function( $, window ) {
	var Pym, $doc, $instance, instance, commonSetup, commonTeardown, config;

	$doc = $( document );

	Pym = window.componentNamespace.Pym;

	commonSetup = function() {
		instance = new Pym( $("[data-pym]")[0] );
	};
	commonTeardown = function() {};

	module( "constructor", config = {
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

	test( "sets class to out", function() {
		ok( instance.$element.is("." + Pym.defaults.class) );
	});

	module( "toggleClass", config );

	test( "should swap the class on the main element", function() {
		ok( instance.$element.is(".enlarge-out") );
		instance.toggleClass();
		ok( instance.$element.is(".enlarge-in") );

		// TODO parameters to a toggle method are super confusing
		instance.toggleClass( true );
		ok( instance.$element.is(".enlarge-out") );
	});

	// TODO test isActive, possibly augment to override at the instance level
	// TODO test double tap event behavior with stubs
	// TODO test double click behavior
})( jQuery, this );
