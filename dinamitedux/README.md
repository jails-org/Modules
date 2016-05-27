# dinamitedux

> dinamitedux is a simplified version of Redux pattern for small applications.

>**Version** :`0.1.1`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

Not all applications requires Flux or Redux architecture due to its simple architecture, for those cases `dinamitedux` might be just the right thing for you.


## Methods

### .getState() :`Object`

Returns the actual state of application

### .dispatch( payload )
Publishes to `store` event sending a payload as a parameter

### .subscribe ( Function )
Subscribe a function and executes on every store updates. (`store:update`).

### .on( String `action@property`, Function reducer)
Register a reducers with an action name, it will be called on every action with the same type called and will get the property from the current state.

## Pub/Sub

### Pubsub.publish('store', action)
Dinamitedux get's a pubsub object to send and receive messages and register a `store` event to get an action. To send an action to the store, just publish to `store` sending an action.

### Pubsub.subscribe('store:update', callback)
To listen to any store updates, just subscribe to `store:update` sending a callback as a parameter.

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

	store.on('UPDATE@cars', function( state, action ){
		state[action.id][ action.type ] = action.value;
		return state;
	})

	store.on('UNSELECT@selected', function( state, action ){
		return null;
	})

	store.on('SELECT@selected', function( state, action ){
		return +(action.id)
	})
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
