define(function(){

	return function( state ){

		var topics = [], actions = {};

		function update( newstate ){
			topics.forEach(function( method ){ method( newstate ) });
			state = newstate;
		}

		return {

			set: function( fn ){
				var newstate = Object.assign({}, state);
				fn( newstate );
				update( newstate );
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
					update( newstate || state );
				}
			},

			actions: function( newactions ){
				actions = newactions
			}
		}
	};
});
