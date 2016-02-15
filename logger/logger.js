define(['jails'],function( jails ){

	var root, items;

	items = {
		app 		:jails.apps,
		controller 	:jails.controllers,
		component	:jails.components
	};

	function print( string ){

		for (var i = 1; i < arguments.length; i++){
			string = string.replace( new RegExp('\\{' + (i-1) + '\\}', 'g'), arguments[i] );
		}

		return '👓[Jails::logger] 👉 ' + string;
	}

	//1. Html markup not found
	function no_used_modules(target){

		var type, name;

		for( type in items ){
			for( name in items[type] ){
				if( !(target||root).querySelector('[data-'+type+'*='+name+']' ) ){
					console.warn(
						print( '{0}.{1} was not found on html markup.', type, name )
					);
				}
			}
		}
	}

	//2. Html markup found but not the module
	function no_module_found(target){

		for( var type in items){
			var m = (target||root).querySelectorAll('[data-'+type+']');

			for( var c = 0; c < m.length; c++){
				var name = m[c].getAttribute('data-'+type).replace(/\s/, '').split(/\,/);

				for(var x = 0; x < name.length; x++)
					if( !(name[x] in jails[type+'s']) ){
						console.warn(
							print( '{0}.{1} is referenced on markup, but module is not loaded into Jails yet.', type, name[x] )
						);
					}
			}
		}
	}

	//3. Watch for emit and listening
	function events_watcher(){

		var publish, subscribe, topics = {};

		for( var type in items )(function(type, items){

			for( var m in items[type] )(function(m){

				var fn = jails[type+'s'][m];

				jails[type+'s'][m] = function(element){

					var emit = this.emit;
					var listen = this.listen;

					this.emit = function(ev){
						console.log( print( '%c{0}.{1} emits \'{1}:{2}\'', type, m, ev ), 'color:green;' );
						emit.apply(this, arguments);
					};

					this.listen = function(ev){

						console.log( print( '{0}.{1} is listening to %c\'{2}\'', type, m, ev ), 'color:#336699;' );
						listen.apply(this, arguments);
						jails.events.on(element, ev, function(){
							console.log( print( '{0}.{1} listened to %c\'{2}\'', type, m, ev ), 'color:green;' );
						});
					};

					if( this.publish && this.subscribe ){
						pubsub(this);
					}

					if( this.x ){
						var x = this.x, it = this;
						this.x = function(target){
							return function(method){
								console.log( print( '[{0}].x( {1} ) called %c'+method +' ✓', it.name, target ), 'color:#336699' );
								return x.call(it, target).apply(it, arguments);
							}
						};
					}

					fn.apply(this, arguments);
				};

			})(m);

		})(type, items);

		pubsub(jails);

		function pubsub(context){

			var publish 	= context.publish;
			var subscribe 	= context.subscribe;

			context.publish = function(ev, args){
				if(!(ev in topics)){
					console.info( print( '[{0}].publish( '+ev+' ) %cFailed, publishing before subscribe, it will try again after a subscribe. ✘', this.name || 'jails' ), 'color:gray; font-style:italic');
				}else{
					console.log( print( '[{0}] %cpublished \'{1}\' ✓', this.name || 'jails', ev ), 'color:green;', args );
				}
				publish.apply(context, arguments);
			};

			context.subscribe = function(ev){
				topics[ev] = true;
				console.log( print( '[{0}] %csubscribed to \'{1}\' ✓', this.name || 'jails', ev ), 'color:green;' );
				subscribe.apply(this, arguments);
			};
		}
	}

	//4. Logging message calls
	function messages_call(target){

		for( var type in items){
			var m = (target||root).querySelectorAll('[data-'+type+']');

			for( var c = 0; c < m.length; c++)(function(element){

				var data = element.getAttribute('data-'+type);

				jails.events.on(element, 'execute', function(e, o){
					console.log( print('%c['+type+'.'+data+'] method executed. ✓'), 'color:#336699', e.detail );
				});

			})(m[c]);
		}
	}

	function refresh(){

		var ref = jails.refresh;

		jails.refresh = function( context ){

			no_used_modules( context );
			no_module_found( context );
			messages_call( context );

			ref.apply(this, arguments);
		};
	}

	return function(scope){

		root = document.documentElement;

		console.log( '👓%c[ Welcome to Jails Logger ]👓', 'color:#336699');

		no_used_modules();
		no_module_found();
		messages_call();

		events_watcher();
	};

});
