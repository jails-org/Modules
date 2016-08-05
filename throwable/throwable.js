define(['jails'],function( jails ){

	return function(){

		var components = jails.components;
		var component  = jails.Component.prototype;

		for ( var name in components ){
			components[name] = wrap( name, components[name] );
		}

		for( var method in component ){
			if( component[method].call && method != 'subscribe' && method != 'publish' ){
				component[method] = wrap( method, component[method] );
			}
		}
	};

	function wrap( name, fn ){

		return function(){

			try{
				var cp = fn.apply( null, arguments );

				if( cp ){
					for (var method in cp ){
						if( cp[method].call && method != 'subscribe' && method != 'publish' ){
							cp[method] = wrap(name, cp[method])
						}
					}
				}

				return cp || {};

			}catch( err ){

				jails.publish('throwable', { err: err, name :name });
				jails.publish('throwable@' + name, { err: err, name :name });

				return {};
			}
		};
	}

});
