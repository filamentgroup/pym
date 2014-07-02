(function( window ) {
  var $ = window.jQuery;

	// auto-init on enhance (which is called on domready)
	$(function(){
    $( "[data-pym]" ).each(function() {
			var pym =  new window.componentNamespace.Pym( this );

      // TODO move both of these into the end of the constructor call
      pym.init();
			$( this ).data( "pym", pym );
    });
  });
})( this );
