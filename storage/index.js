;(function(){

	var base;

	function _interface( object ){

		this.set = function( name, data ){
			object.setItem( name, JSON.stringify( data ) );
			return data;
		};

		this.get = function( name ){

			var value = object.getItem( name );
			// Tihs way I can distinguish what is a string and what is an object serialized.
			try{ value = JSON.parse( value ); }
			catch(e){}

			return value;
		};

		this.remove = function( name ){

			var data = this.get( name );
			object.removeItem( name );

			return data;
		};
	}

	base = {
		local 	:new _interface( localStorage ),
		session :new _interface( sessionStorage )
	};

	// UMD export
	if ( typeof define === 'function' && define.amd ) {
		define(function () { return base; });
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.exports = base;
	} else {
		window.Storage = base;
	}
})();
