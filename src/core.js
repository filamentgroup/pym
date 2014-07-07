(function( $, w ) {
	"use strict";

	var Pym = function( element, options ){
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

		$.extend( this, Pym.defaults );
		$.extend( this, options );

		this.init();
		this.$element.data( "pym", this );
	};

	Pym.defaults = {
		scaleFactor: 1,
		buttonText: "Zoom in",
		zoomedButtonText: "Zoom out",
		class: "enlarge-out",
		zoomedClass: "enlarge-in"
	};

	Pym.prototype.setScale = function( val ) {
		this.$img.css({
			"width": val * 100 + "%"
		});
	};

	/* jshint expr: true */
	Pym.prototype.setMaxHeight = function(){
		this.$scroller.css( "padding-top", this.$scroller[ 0 ].offsetHeight / this.$scroller[ 0 ].offsetWidth * 100 + "%" );
		this.$element.addClass( "enlarge-cropped" );

		// force reflow
		this.$img[ 0 ].offsetLeft;
	};

	// TODO remove once it's clear this is unnecesary
	Pym.prototype.containerHeight = function( set ){
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

	Pym.prototype.out = function() {
		this.$element.trigger( "enlarge-out" );
		this.scale-= this.scaleFactor;

		if( this.scale < this.minScale ){
			this.scale = this.minScale;
		}

		// TODO remove once it's clear this is unnecesary
		// this.containerHeight( false );
		this.setScale( this.scale );
		this.setButtonText( this.buttonText );
		this.toggleClass( true );
	};

	Pym.prototype.in = function() {
		this.$element.trigger( "enlarge-in" );
		this.scale+= this.scaleFactor;

		if( this.scale > this.maxScale ){
			this.scale = this.maxScale;
		}

		// TODO remove once it's clear this is unnecesary
		// this.containerHeight( true );
		this.setScale( this.scale );
		this.setButtonText( this.zoomedButtonText );
		this.toggleClass( false );
	};

	Pym.prototype.setButtonText = function( val ){
		this.$element.find( "button" ).html( val );
	};

	// TODO the name of this method is super confusing given that it's parameterized
	Pym.prototype.toggleClass = function( out ){

		// if we want to be zoomed out (i.e. out == true) then use the default class
		// otherwise use the zoomed class
		this.$element
			.removeClass( out ? this.zoomedClass : this.class )
			.addClass( out ? this.class : this.zoomedClass );
	};

	Pym.prototype.buttons = function(){
		var self, $btn;

		self = this;
		$btn = this.$element.find( "nav button" );

		$btn.bind( "touchend mouseup",function( e ){
			e = e.originalEvent || e;
			self.toggleZoom();
			e.preventDefault();
		});
	};

	Pym.prototype.isActive = function(){
		return window.getComputedStyle( this.$element.find( "nav" )[ 0 ] , null ).getPropertyValue( "display" ) !== "none";
	};

	Pym.prototype.toggleZoom = function(){
		if( this.scale === this.maxScale ){
			this.out();
		} else {
			this.in();
		}
	};

	Pym.prototype.toggleIfActive = function( e ){
		if( this.isActive() ){
			this.toggleZoom();
		}
	};

	Pym.prototype.gestures = function() {
		var lastTouchTime,
			hoverDisable = false,
			self = this;

		// doubletap
		this.$element.bind( "touchstart", function(){
			hoverDisable = true;
		});

		this.$element.bind( "touchend", function( e ){
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
		});

		this.$element.bind( "dblclick", function( e ){
			self.toggleIfActive( e );
		});
	};

	Pym.prototype.init = function() {
		this.buttons();
		this.toggleClass( true );
		this.gestures();
	};

	// TODO sort out the naming discrepancy in here
	(w.componentNamespace = w.componentNamespace || w).Pym = Pym;
}( jQuery, this ));
