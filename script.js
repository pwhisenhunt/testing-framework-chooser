var engines = [
		{
			name: "Jasmine",
			link: "http://pivotal.github.io/jasmine/",
			link_text: "github",
			size: "",
			grunt: "https://github.com/gruntjs/grunt-contrib-jasmine",
			traits: [ "unit", "grunt", "bdd" ]
		},
		{
			name: "QUnit",
			link: "http://qunitjs.com/",
			link_text: "project",
			size: "",
			grunt: "https://github.com/gruntjs/grunt-contrib-qunit",
			traits: [ "unit", "grunt" ]
		},
		{
			name: "mocha",
			link: "http://visionmedia.github.io/mocha/",
			link_text: "project",
			size: "",
			grunt: "https://github.com/kmiyashiro/grunt-mocha",
			traits: [ "unit", "grunt", "bdd" ]
		},
		{
			name: "Hiro",
			link: "http://hirojs.com/",
			link_text: "project",
			size: "",
			grunt: "",
			traits: [ "unit" ]
		},
		{
			name: "FuncUnit",
			link: "http://funcunit.com/",
			link_text: "project",
			size: "",
			grunt: "https://github.com/alexisabril/grunt-funcunit",
			traits: [ "integration", "grunt" ]
		},
		{
			name: "Buster.js",
			link: "http://docs.busterjs.org/en/latest/",
			link_text: "project",
			size: "",
			grunt: "",
			traits: [ "unit" ]
		},
		{
			name: "JsTestDriver",
			link: "https://code.google.com/p/js-test-driver/",
			link_text: "project",
			size: "",
			grunt: "",
			traits: [ "unit" ]
		},
		{
			name: "CasperJS",
			link: "http://casperjs.org/",
			link_text: "project",
			size: "",
			grunt: "https://github.com/ronaldlokers/grunt-casperjs",
			traits: [ "integration", "grunt" ]
		},
		{
			name: "SpookyJS",
			link: "https://github.com/WaterfallEngineering/SpookyJS",
			link_text: "github",
			size: "",
			grunt: "",
			traits: [ "integration" ]
		},
		{
			name: "Zombie.js",
			link: "http://zombie.labnotes.org/",
			link_text: "project",
			size: "",
			grunt: "",
			traits: [ "integration" ]
		}
	],
	chooser = {
		choices: []
};

$( function () {
	// render all engines
	var tmpls = doT.template( $( "#tmplsTmpl" ).text() ),
		$eng = $( "div.engines" );
	$eng.html( tmpls( { all: engines } ) );

	$( "div.criteria" ).on( "click", "fieldset", function() {
		var $t = $( this );
		if ( $t.hasClass( "on" ) ) {
			$t.removeClass( "on" );
			removeSibs( $t.find( "label" ) );
			updateClasses();
		} else {
			$t.addClass( "on" );
			var curr = $t.find( "input:checked" );
			if ( curr.length ) {
				setCriteria( curr.parent() );
			}
		}
	});
	$( "div.criteria" ).on( "click", "label", function( e ) {
		e.stopPropagation();
		setCriteria( this );
	});

	function setCriteria( lbl ) {
		var $t = $( lbl ),
			cname = $t.find( "input" ).val(),
			classes;

		removeSibs( $t.siblings( "label" ) );
		if ( cname.length ) {
			$.each( cname.split( "." ), function( i, nm ) {
				if ( chooser.choices.indexOf( nm ) === -1 ) {
					chooser.choices.push( nm );
				}
			});
		}
		updateClasses();
	}

	function removeSibs( sibs ) {
		var removeIndex;

		$( sibs ).each( function() {
			removeIndex = chooser.choices.indexOf( $( this ).find( "input" ).val() );
			if ( removeIndex > -1 ) chooser.choices.splice( removeIndex, 1 );
		});
	}

	function updateClasses() {
		if ( !chooser.choices.length ) {
			$eng.find( "div.remove" ).addClass( "add" ).removeClass( "remove" );
			return;
		}
		classes = chooser.choices.join( "." );
		$eng.find( "div:not(." + classes + ")" ).addClass( "remove" ).removeClass( "add" );
		$eng.find( "div." + classes ).addClass( "add" ).removeClass( "remove" );
	}
});
