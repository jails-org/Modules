define(['jails'],function( jails ){

	var root 	   = document;
	var Component  = jails.Component;
	var components = jails.components;
	var refresh    = jails.refresh;

	jails.refresh = function( context ){

		markup( context );
		module_not_found( context );
		emit_and_listen( context );

		refresh.apply(this, arguments);
	};

	//1. Html markup not found
	function markup( target ){

		for( var name in components ){
			name = name.replace(/\//g, '\\/');
			if( !(target||root).querySelector('[data-component*='+name+']' ) ){
				console.warn(
					style( 'Component.{0} was not found on html markup.', name )
				);
			}
		}
	}

	//2. Html markup found but not the module
	function module_not_found( target ){

		var m = (target||root).querySelectorAll('[data-component]');

		for( var c = 0; c < m.length; c++){
			var name = m[c].getAttribute('data-component').replace(/\,/, ' ').replace(/\s{2,}/, ' ').split(/\s/);

			for(var x = 0; x < name.length; x++)
				if( !(name[x] in jails.components) ){
					console.warn(
						style( 'Component.{0} is referenced on markup, but module is not loaded into Jails yet.', name[x] )
					);
				}
		}

	}

	//3. Watch for emit and listening
	function emit_and_listen(){

		var proto = Component.prototype;

		var base = {
			emit 	:proto.emit,
			listen 	:proto.listen,
			get 	:proto.get,
			publish :proto.publish,
			subscribe :proto.subscribe
		};

		proto.emit = function(ev, args){
			console.log( style( '%cComponent.{0} emits \'{0}:{1}\'', this.name, ev ), 'color:green;', args );
			base.emit.apply( this, arguments );
		}

		proto.listen = function(ev, args){
			var name = this.name;
			console.log( style( 'Component.{0} is listening to %c\'{1}\'', name, ev ), 'color:#336699;' );
			base.listen.apply( this, arguments );
			jails.events.on(this.element, ev, function(){
				console.log( style( 'Component.{0} listened to %c\'{1}\'', name, ev ), 'color:green;' );
			});
		}

		proto.get = function( target ){
			var _self = this;
			return function(method){
				var args = Array.prototype.slice(arguments);
				args.shift();
				console.log( style( '[{0}] => '+target+'.%c'+method +' ✓', _self.name, target ), 'color:#336699', args );
				return base.get.call(_self, target).apply(_self, arguments);
			};
		}

		proto.publish = function(ev, args){
			console.log( style( '[{0}] %cpublished \'{1}\' ✓', this.name || 'jails', ev ), 'color:green;', args );
			base.publish.apply( this, arguments );
		}

		proto.subscribe = function(ev, args){
			console.log( style( '[{0}] %csubscribed to \'{1}\' ✓', this.name || 'jails', ev ), 'color:green;' );
			base.subscribe.apply( this, arguments );
		}
	}

	function style( string ){

		for (var i = 1; i < arguments.length; i++){
			string = string.replace( new RegExp('\\{' + (i-1) + '\\}', 'g'), arguments[i] );
		}

		return '👓 [Jails::logger] 👉 ' + string;
	}

	return function(){
		console.log( '👓%c[ Welcome to Jails Logger ]👓', 'color:#336699');

		markup();
		module_not_found();
		emit_and_listen();
	}

});
