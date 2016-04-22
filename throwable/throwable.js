define(['jails'],function( jails ){

	return function(config){

		config = config || {};
		var debug = config.debug || false;

		wrap();
		jails.events.on( window, 'error', error );

		function wrap(){

			var module, item,
			modules = ['app', 'controller'],
			len = modules.length;

			for(var i = 0; i < len; i++){

				module = modules[i];
				item = jails[module+'s'];

				for( var name in item ){
					item[name] = wrapper( item[name], module );
				}
			}
		}

		function wrapper( fn, type ){

			return function( html, data ){

				var instance = this;

				if(debug) fn.apply( instance, arguments );
				else try{
					fn.apply( instance, arguments );
				}
				catch(err){
					error({ error :{
						at 		:type,
						message :err,
						element :html,
						module	:instance,
						data 	:data
					}});
				}

				if(!debug)
				productionize( instance, {
					at 		:type,
					message :'',
					element :html,
					module	:instance,
					data 	:data
				});

				instance.try = function(fn){
					return debug? fn :function(){
						try{ fn.apply( this, arguments ); }
						catch(err){
							error({ error :{
								at 		:type,
								message :err,
								element :html,
								module	:instance,
								data 	:data
							}});
						}
					};
				};
			};
		}

		function productionize( object, thrown ){

			var name, method;

			for (name in object){
				method = object[name];

				if( method.call ){
					object[name] = function( name, method ){
						return function(){
							try {
								return method.apply(this, arguments);
							} catch (err) {
								thrown.message = err;
								error({ error : thrown });
							}
						};
					}(name, method);
				}
			}
		}

		function error(e){

			if( debug ) return false;

			var err = e.error;

			jails.publish('throwable', err, e);

			if( err.at )
				jails.publish('throwable@'+err.at+':'+err.module.name, err, e);

			if( e.preventDefault )
				e.preventDefault();

			return true;
		}
	};

});
