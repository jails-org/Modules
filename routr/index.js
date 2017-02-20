define(function(){

	return function( routes ){

		var urls = [], Router, PubSub;

		Router = {

			root :'#',

			get :function( pattern, callback ){
				PubSub.subscribe( pattern, callback );
				urls.push({ pattern: pattern, regex :pattern.replace(/\:\w*/g, '([^&/#?]+)') });
				return this;
			},

			set :function( map ){
				for( var url in map ) this.get( url, map[ url ] );
				return this;
			},

			run :function( url ){

				urls.some(function( i, index ){

					var item 	= urls[ index ],
						match 	= decodeURIComponent( url || location.hash ).replace(/\/*$/, '').match( item.regex );

					if( match ){
						match.shift();
						PubSub.publish( item.pattern, match );
						return true;
					}
				});

				return this;
			},

			watch :function(){
				window.addEventListener( 'hashchange', function(){ Router.run(); } );
				return this;
			}
		};

		// Inspired by :
		// http://dev.housetrip.com/2014/09/15/decoupling-javascript-apps-using-pub-sub-pattern/
		PubSub = (function( topics ){

			return{
				subscribe :function( ev, fn ){
					topics[ev] = topics[ev] || [];
					topics[ev].push( fn );
				},

				publish :function( ev, args ){
					topics[ev] = topics[ev] || [];
					topics[ev].forEach(function(fn) {
						if( fn ) fn.apply( this, args );
					});
				}
			};

		})({});

		return Router.set( routes );
	};
});
