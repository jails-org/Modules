define(function(){

	return function( pubsub, state ){

		var self = this;

		this.getState = function(){
			return state;
		};

		this.subscribe = function( callback ){
			pubsub.subscribe('store:update', callback);
		};

		this.dispatch = function( action ){
			pubsub.publish('store', action);
		};

		pubsub.subscribe('store', function( payload ){
			if( payload.action in self ){
				var newstate = self[ payload.action ].call(null, state, payload );
				pubsub.publish( 'store:update', newstate );
			}
		});
	};
});
