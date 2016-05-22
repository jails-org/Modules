define(function(){

	return function( pubsub, state ){

		var self = this;

		this.getState = function(){
			return Object.assign( state )
		};

		pubsub.subscribe('store', function( payload ){
			if( payload.action in self ){
				var newstate = self[ payload.action ].call( null, state, payload )
				pubsub.publish( 'store:update', newstate )
			}
		})
	};
});
