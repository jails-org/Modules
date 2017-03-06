define(['jails-js', 'morphdom'], function( jails, morphdom ){

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
});
