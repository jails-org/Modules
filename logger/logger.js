define(function(){

	return function( jails ){

		var base = jails.component;
		var root = document.documentElement;

		log();

		jails.component = function( name, element ){

			var component;

			module_not_loaded( name, jails.components );
			module_not_found( jails.components );

			component = base.apply( this, arguments );
			return component;
		};

		function empty( name ){
			return function( c, el, props ){
				console.info('%c||\\| %c[ Logger %c] - [%c '+name+' %c] is not loaded on jails.start().', 'color:#369BBF; font-weight:bolder; padding:5px 0;', 'font-weight:bold', 'font-weight:normal', 'font-weight:bold; color:#369BBF', 'font-weight:normal');
			};
		}

		function module_not_loaded( name, components ){
			if( !(name in components) )
				components[name] = empty(name);
		}

		function module_not_found( components ){
			for(var name in components)
				if( !document.querySelector('[data-component*='+name+']') )
					console.info('%c||\\| %c[ Logger %c] - [%c '+name+' %c] not found in markup on jails.start().', 'color:#369BBF; font-weight:bolder; padding:5px 0;', 'font-weight:bold', 'font-weight:normal', 'font-weight:bold; color:#369BBF', 'font-weight:normal');
		}

		function log(){
			console.log('%c||\\| %c[ Logger %c] is ready.', 'color:#369BBF; font-weight:bolder; padding:5px 0;', 'font-weight:bold', 'font-weight:normal');
		}
	};

});
