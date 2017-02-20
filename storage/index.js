define(function(){

	function interface( object ){

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

	return{
		local 	:new interface( localStorage ),
		session :new interface( sessionStorage )
	};
});
