(function( $, w ) {
	"use strict";

	var componentName = "enlarge";

	var enlarge = function( element, options ){
		if( !element ){
			throw new Error( "Element required to initialize object" );
		}

    this.options = options = options || {};

		this.element = element;
		this.$element = $( element );
		this.$img = this.$element.find( "img" );
		this.$scroller = this.$element.find( ".enlarge-zoom" );
		this.scale = 1;
		this.minScale = 1;
		this.maxScale = 2;
		this.scaleFactor = options.scaleFactor || 1;
		this.defaultText = options.defaultText || "Zoom in";
		this.zoomedText = options.zoomedText || "Zoom out";
		this.classDefault = options.classDefault || componentName + "-in";
		this.classZoomed = options.classZoomed || componentName + "-out";
	};

	enlarge.prototype.setScale = function( val ) {
		this.$img.css( {
			"width": val * 100 + "%"
		});
	};

	enlarge.prototype.setMaxHeight = function(){
		this.$scroller.css( "padding-top", this.$scroller[ 0 ].offsetHeight / this.$scroller[ 0 ].offsetWidth * 100 + "%" );
		this.$element.addClass( "enlarge-cropped" );
		this.$img[ 0 ].offsetLeft;
	};

	enlarge.prototype.containerHeight = function( set ){
		if( set ){
			if( this.scale === this.maxScale ){
				this.$element.css( "height", this.$img[ 0 ].offsetHeight * this.scale + "px" );
			} else {
				this.$element.css( "height", this.$img[ 0 ].offsetHeight / this.scale + "px" );
			}
		} else {
			this.$element.css( "height", "auto" );
		}
	};

	enlarge.prototype.out = function() {
		this.$element.trigger( "enlarge-out" );
		this.scale-= this.scaleFactor;
		if( this.scale < this.minScale ){
			this.scale = this.minScale;
		}

//		this.containerHeight( false );
		this.setScale( this.scale );
		this.buttonText( this.defaultText );
		this.toggleClass( true );
	};

	enlarge.prototype.in = function() {
		this.$element.trigger( "enlarge-in" );
		this.scale+= this.scaleFactor;
		if( this.scale > this.maxScale ){
			this.scale = this.maxScale;
		}
		// this.containerHeight( true );
		this.setScale( this.scale );
		this.buttonText( this.zoomedText );
		this.toggleClass( false );
	};

	enlarge.prototype.buttonText = function( val ){
		this.$element.find( "button" ).html( val );
	};

	enlarge.prototype.toggleClass = function( out ){
		this.$element
			.removeClass( out ? this.classDefault : this.classZoomed )
			.addClass( out ? this.classZoomed : this.classDefault );
	};

	enlarge.prototype.buttons = function(){
		var self, $btn;

		self = this,
		$btn = this.$element.find( "nav button" );

		$btn.bind( "touchend mouseup",function( e ){
			e = e.originalEvent || e;
			self.toggleZoom();
			e.preventDefault();
		});
	};

	enlarge.prototype.isActive = function(){
		return window.getComputedStyle( this.$element.find( "nav" )[ 0 ] , null ).getPropertyValue( "display" ) !== "none";
	};

	enlarge.prototype.toggleZoom = function(){
		if( this.scale === this.maxScale ){
			this.out();
		} else {
			this.in();
		}
	};

	enlarge.prototype.toggleIfActive = function( e ){
		if( this.isActive() ){
			this.toggleZoom();
		}
	};

	enlarge.prototype.gestures = function() {
		var lastTouchTime,
			hoverDisable = false,
			self = this;

		// doubletap
		this.$element
			.bind( "touchstart", function(){
				hoverDisable = true;
			} )
			.bind( "touchend", function( e ){
				e = e.originalEvent || e;
				hoverDisable = false;
				if( $( e.target ).closest( "nav" ).length > 0 ){
					return;
				}
				var thisTime = new Date().getTime();
				if( lastTouchTime && thisTime - lastTouchTime < 300 ){
					self.toggleIfActive( e );
				}
				lastTouchTime = thisTime;
				e.preventDefault();

			} )
			.bind( "dblclick", function( e ){
				self.toggleIfActive( e );
			} );

	};

	enlarge.prototype.init = function() {
		this.buttons();
		this.toggleClass( true );
		this.gestures();
	};

  // TODO sort out the naming discrepancy in here
	(w.componentNamespace = w.componentNamespace || w)[ "Pym" ] = enlarge;
}( jQuery, this ));
