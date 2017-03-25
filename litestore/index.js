;(function(){

	var Litestore = function( state ){

		var topics = [], actions = {};

		function update( newstate, action ){
			topics.forEach(function( method ){
				method( newstate, { action:action, oldstate:state, newstate: newstate })
			});
			state = newstate;
		}

		return {

			set: function( fn ){
				var newstate = Object.assign({}, state);
				fn( newstate );
				update( newstate, '' );
			},

			get: function(){
				return state;
			},

			subscribe: function( fn ){
				topics.push( fn );
				return function(){ topics = topics.filter( function(item){ return item != fn; } )}
			},

			dispatch: function( action, payload ){
				if( action in actions ){
					var newstate = Object.assign({}, actions[ action ].call( null, state, payload ));
					update( newstate || state, action );
				}
			},

			actions: function( newactions ){
				actions = Object.assign( actions, newactions );
			}
		}
	};

	// UMD export
	if ( typeof define === 'function' && define.amd ) {
		define(function () { return Litestore; });
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.exports = Litestore;
	} else {
		window.Litestore = Litestore;
	}
})();
