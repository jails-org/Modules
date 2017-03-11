;(function(){

	var Logger = function( jails ){

		var components = jails.components;

		markup( components );
		modules( components );
		profile( jails );
		checkorder( jails );
	};

	function profile( jails ){

		var start = jails.start;

		jails.start = function(){

			var timeend;
			var time = new Date().getTime();

			start.apply(jails, arguments);
			timeend = new Date().getTime() - time;
			console.info('[ Logger ]', 'jails.start:', timeend , 'ms');
		};
	}

	function markup( components ){
		for(var name in components)
			if( !document.querySelector('[data-component*='+name+']') ){
				console.info('[ Logger ]', name, 'was not found in markup on jails.start()');
			}
	}

	function modules( components ){

		each(document.querySelectorAll('[data-component]'), function( node, index){
 			each(node.getAttribute('data-component').split(/\s/), function(name){
				if(!(name in components)){
					console.info('[ Logger ]', name, 'was not loaded on jails.start()');
				}
			})
		});
	}

	function checkorder( jails ){

		var base = jails.component;
		var fromto = {};

		jails.component = function( name, node ){

			var object = base.apply( jails, arguments ),
				emit = object.emit,
				on   = object.on,
				get  = object.get,

				link = {
					emit :'http://github.com/jails-org/Jails/wiki/Common-Errors#no-component-is-listening-to-a-emit',
					method:'https://github.com/jails-org/Jails/wiki/Common-Errors#component-does-not-execute-a-method'
				}

			object.on = function(ev, callback){
				if(ev.match(/\:/))
					fromto[ev] = node;
				on.apply(object, arguments);
			};

			object.emit = function(ev){
				if(!(ev in fromto))
					console.info('[ Logger ]', name, 'emited', ev, 'but there are no component listening.\n', link.emit);
				emit.apply(object, arguments);
			};

			object.get = function( n, query ){

				var fn = get.apply( object, arguments );

				return function( method ){

					var selector = '[data-component*='+n+']';
					var found = false;
					query = query? selector + query : selector;

					each( node.querySelectorAll( query ), function( el ){
						if( el.j && el.j[n] && (method in el.j[n].methods) )
							found = true;
					});

					if( node.matches(query) )
						if( node.j && node.j[n] && (method in node.j[n].methods) )
							found = true;

					if(!found){
						console.info('[ Logger ]', name, 'called', '.'+method+'()', 'but there are no component with that method.\n', link.method);
					}

					fn.apply(null, arguments);
				}
			};

			return object;
		};
	}

	function each( list, callback ){
		for( var i = 0, len = list.length; i < len; i++ )
			callback(list[i], i, list);
	}

	// UMD export
	if ( typeof define === 'function' && define.amd ) {
		define(function () { return Logger; });
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.exports = Logger;
	} else {
		window.Logger = Logger;
	}

})();
