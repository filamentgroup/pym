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

	test( "override defaults", function() {
		instance = new Pym( $("[data-pym]")[0], {
			scaleFactor: 2,
			buttonText: "foo",
			zoomedButtonText: "bar",
			class: "baz",
			zoomedClass: "bak"
		});

		equal(instance.buttonText, "foo" );
		equal(instance.zoomedButtonText, "bar" );

	});
})( jQuery, this );
