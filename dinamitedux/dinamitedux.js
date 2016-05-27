define(function(){

	return function( pubsub, state ){

		this.getState = function(){
			return state
		};

		this.subscribe = function( callback ){
			pubsub.subscribe('store', callback);
		};

		this.dispatch = function( action ){
			pubsub.publish('store', action);
		};

		this.on = function( action, reducer ){
			var args = action.split(/\@/);
			pubsub.subscribe('store@' + args[0], ( state, payload )=>{
				var prop = state[args[1]];
				state[args[1]] = reducer( prop, payload );
			});
		};

		pubsub.subscribe('store', function( payload ){
			pubsub.publish('store@'+payload.action, state, payload);
			pubsub.publish( 'store:update', state );
		});
	};
});
