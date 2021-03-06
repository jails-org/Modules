define(['jails'],function( jails ){

	return function( config ){

		config = config || {};

		var components = jails.components;
		var component  = jails.Component.prototype;

		for ( var name in components ){
			components[name] = wrap( name, components[name] );
		}

		for( var method in component ){
			if( component[method].call && !(method in component) ){
				component[method] = wrap( method, component[method] );
			}
		}
	};

	function wrap( name, fn, methd ){

		return function(){

			try{
				var cp = fn.apply( null, arguments );

				if( cp ){
					for (var method in cp ){
						if( cp[method].call && !(method in jails.Component.prototype) ){
							cp[method] = wrap(name, cp[method], method)
						}
					}
				}

				return cp || {};

			}catch( err ){
				var error = { err: err, component :name, method :methd }

				jails.publish('throwable', error);
				jails.publish('throwable@' + name, error);

				return {};
			}
		};
	}

});
