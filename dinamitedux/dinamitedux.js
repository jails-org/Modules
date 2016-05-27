define(function(){

	return function( pubsub, state ){

		var self = this;

		this.getState = function(){
			return Object.assign( state )
		};

		this.subscribe = function( callback ){
			pubsub.subscribe('store', callback);
		};

		this.dispatch = function( action ){
			pubsub.publish('store', action);
		};

		this.on = function( action, reducer ){
			pubsub.subscribe('store@' + action, reducer);
		};

		pubsub.subscribe('store', function( payload ){
			var newstate = Object.assign(state);
			pubsub.publish('store@'+payload.action, newstate, payload);
			pubsub.publish( 'store:update', newstate );
		});
	};
});
