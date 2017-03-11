;(function(){

	function stream( method, timeout ){

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

	// UMD export
	if ( typeof define === 'function' && define.amd ) {
		define(function () { return stream; });
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.exports = stream;
	} else {
		window.Stream = stream;
	}
})();
