# throwable

> Extends Jails with Error Handling Interface.

>**Version** :`1.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

This module helps you to handling exceptions and keeping all the modules working if some other module breaks.
Also, helps you to subscribe to custom events to handle common errors outside your module logic.

## Usage

You need to include the `throwable` as a 'middleware' in your config file.
After that, you need to call it before Jails starts.

```js
require.config({

	baseUrl :'js/',
	deps	:['jails', 'throwable', global.page],

	paths   :{
		jails		:'//rawgit.com/jails-org/Jails/master/source/jails.min',
		throwable	:'../../../Modules/throwable/throwable'
	},

	callback :function( jails, throwable ){
		throwable();
		//Debug === true lets the browser handles the error,
		//Use that for debug
		jails.start();
	}
});

```

## What Throwable does?

It will encapsulate all the Jails modules calls and also the `.init()` methods on a try/catch statement.
This will ensure that in production if there's an error on a module, the other modules won't be compromised.

Also, it publishes 2 custom events on Jails.pub/sub to handle errors outside your module.

## Usage

### subscribe( 'throwable', Function )

Using throwable in production no application errors will be logged on console, this "global" subscription is quite useful to log custom errors on console.

### subscribe( 'throwable@component', Function )

Instead of handling errors inside your module, you can create errors files that can handle common errors. Keeping your application logic decoupled with error handling.

**my-component.js**

```js
define([
	'jails',
	'errors/my-component.error'
], function( jails ){

	jails('my-component', function( component, html, data ){

		component.init = function(){
			undefinedMethod();
		};
	});
});
```

**my-component.error.js**
```js
define(['jails'], function( jails ){

	jails.subscribe('throwable@my-component', function( error ){
		console.log( error );
	});
});
```
