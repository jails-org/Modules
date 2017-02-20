define(function(){

	var data = {};

	return{

		set :function(name, object){

			if(!object || name.constructor != String){
				object = name;
				name = '*';
			}

			data[ name ] = object;
			return object;
		},

		get :function(name, object){

			name = name || '*';

			if( data[name] ){
				return data[name];
			}else if( object ){
				return this.set( name, object );
			}

			return null;
		},

		remove :function(name){
			delete data[ name ];
		},

		destroy :function(){
			data = {};
		},

		data :function(){
			return data;
		}
	};
});
