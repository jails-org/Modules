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

		pubsub.subscribe('store', function( payload ){
			if( payload.action in self ){
				var newstate = self[ payload.action ].call( null, Object.assign(state), payload )
				pubsub.publish( 'store:update', newstate )
			}
		})
	};
});
