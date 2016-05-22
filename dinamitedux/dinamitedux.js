define(function(){

	return function( pubsub, state ){

		this.getState = function(){
			return Object.assign( state )
		};

		pubsub.subscribe('store', function( payload ){
			if( payload.action in this ){
				var newstate = this[ payload.action ].call( null, state, payload )
				pubsub.publish( 'store:update', newstate )
			}
		})
	};
});
