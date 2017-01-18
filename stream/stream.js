define(function(){

	return function( method, timeout ){

		var id, $stream = [],
			timeout = timeout || 500;

		return function( args ){

			clearTimeout( id );
			$stream.push( args );

			id = setTimeout(function(){
				method( $stream );
				$stream = [];
			}, timeout);
		}
	}
})
