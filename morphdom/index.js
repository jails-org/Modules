;(function(){

	var factory = function( jails, morphdom ){

		return function( node, render, state ){

			state = state || {};
			var old = render( state );
			node.appendChild( old );
			jails.start( node );

			return function( state ){

				var newdom = render( state );
				var hascomponent = false;

				old = morphdom( old, newdom, {
					onBeforeNodeAdded :function( node ){
						if( node.getAttribute && node.getAttribute('data-component') )
							hascomponent = true;
					}
				});

				if( hascomponent )
					jails.start( node );
			};
		};
	}

	// UMD export
	if ( typeof define === 'function' && define.amd ) {
		define(['jails-js', 'morphdom'], factory);
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.morphdom = factory(require('jails-js'), require('morphdom'));
	} else {
		window.morphdomAdapter = factory(window.jails, window.morphdom);
	}
})();
