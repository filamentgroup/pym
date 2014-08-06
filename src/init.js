(function( window ) {
	var $ = window.jQuery;

	$(function(){
		$( "[data-pym]" ).each(function() {
			var pym =  new window.componentNamespace.Pym( this );
		});
	});
})( this );
