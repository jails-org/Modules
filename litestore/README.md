# litestore

>A Simple store using one direction flow implementation.

>**Version** :`3.1.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

# Usage

## Using the uncentralized and straightfoward way

Use that form when your application is very simple and you don't want to create other files in order to manage store states.

`components/my-app.js`

```js
var jails = require('jails-js');
var litestore = require('jails-modules/litestore');

jails('my-app', function( component, element, props ){

	var store = liteStore({
		title : 'Devs',
		items :['Paul', 'Michael', 'Joseph']
	});

	component.init(function(){

		store.subscribe( update );

		//Changing title
		store.set(function( state ){ state.title = 'New Devs' });

		//Changing items
		store.set(function( state ){ state.items = ['Andrew', 'Isaac', 'Albert'] });
	});

	function update( state ){
		var title = '<h2>'+ state.title +'</h2>';
		var peoples = '<p>' + state.items.join('-') + '</p>';
		element.innerHTML = title + peoples;
	}

});

```

## Centralize the actions and state of your application in a different file

Use this form when your application is a little bit complex, and you want to set all information about state and mutations outside your component in another js module.

```js
var jails   = require('jails-js');
var mystore = require('./mystore');

jails('my-app', function( component, element, annotation ){

	var store = mystore();

	component.init(function(){
		store.subscribe( update );
		//Changing title
		store.dispatch('CHANGE_TITLE', { text: 'New Devs' });
		//Changing items
		store.dispatch('CHANGE_ITEMS', { list: ['Andrew', 'Isaac', 'Albert'] });
	});

	function update( state ){
		var title = '<h2>'+ state.title +'</h2>';
		var peoples = '<p>' + state.items.join('-') + '</p>';
		element.innerHTML = title + peoples;
	}

});
```

`./mystore.js`

```js
var jails 	  = require('jails-js');
var litestore = require('jails-modules/litestore');

var mystore = liteStore({
	title : 'Devs',
	items : ['Paul', 'Michael', 'Joseph']
});

mystore.actions({

	'CHANGE_TITLE': function( newstate, payload ){
		newstate.title = payload.text;
		return newstate;
	},

	'CHANGE_ITEMS': function( newstate, payload ){
		newstate.items = payload.list;
		return newstate;
	}
});

return mystore;
```

# API

## .subscribe( Function(state) )  :unsubscribe()
Add a listener to store updates, gets the state of the store. The `.subscribe()` call will return an `unsubscribe` function to remove the listener.

## .set( Function( state ) )

Updates the state and triggers store changes to the listeners automatically.

## .get() : state
Returns the internal state.

## .actions( Object )
Set a dictionary containing the name of an action as key and the methods to change the state as values. Each method will receive the `state` and the `payload` on dispatches.

## .dispatch( String action, [Object payload] )
Triggers an action of the store sending optional data ( payload ).

This method will call the action in the store if that action exists, after action computation, the store will be updated and emit to all subscribers that store has changed.
