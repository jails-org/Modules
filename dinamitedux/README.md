# litestore

> litestore is a simplified version of Redux pattern for small applications.

>**Version** :`0.1.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

Not all applications requires Flux or Redux architecture due to its simple architecture, for those cases `litestore` might be just the right thing for you.


## Methods

### .getState() :`Object`

Returns the actual state of application

## Usage

`stores/cars.js`

```js
require([

	'jails',
	'modules/litestore'

], function( jails, Store ){

	var store = new Store( jails, {
		title 	 : 'Vehicles',
		cars 	 : [
			{ id :1, brand :'BMW', model :'x6' },
			{ id :2, brand :'BMW', model :'x1' },
			{ id :3, brand :'Volkswagen', model :'Golf GTI' },
			{ id :4, brand :'Chevrolet', model :'Cruze' },
			{ id :5, brand :'Ford', model :'Fusion' },
			{ id :6, brand :'Fiat', model :'Bravo' },
			{ id :7, brand :'Mercedes', model :'C180' }],
		selected : null
	});

	store.UPDATE = function( state, action ){
		state.selected[ action.type ] = action.value;
		return state;
	}

	store.UNSELECT = function( state, action ){
		state.selected = null;
		return state;
	}

	store.SELECT = function( state, action ){
		state.selected = state.cars.filter(function( car ){
			return car.id == action.id;
		})[0];
		return state;
	}
});

```

`controllers/cars.js`

```js
require([

	'jails'

], function( jails ){

	jails.controller('my-car-controller', function(){

		this.init = function(){

			this.on( 'click', 'button', update );
			this.subscribe('store:update', log);
		};

		function update(e){

			this.publish('store', {
				action	: 'UPDATE',
				value	: e.target.value,
				type 	: e.target.getAttribute('data-type')
			});
		}

		function log( state ){
			console.log('The state', state);
		}
	});
});

```
