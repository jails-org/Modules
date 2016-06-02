# throwable

> Extends Jails with Error Handling Interface.

>**Version** :`0.1.0`

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
		throwable({ debug :false });
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

### subscribe( 'throwable@controller', Function )

Instead of handling errors inside your module, you can create errors files that can handle common errors. Keeping your application logic decoupled with error handling.

**my-controller.js**

```js
define([
	'jails',
	'errors/test.error'
], function( jails ){

	jails.controller('test', function( html, data ){

		this.init = function(){
			undefinedMethod();
		};
	});
});
```

**test.error.js**
```js
define(['jails'], function( jails ){

	jails.subscribe('throwable@controller:test', function( error ){

		switch( error.message ){
			default : console.error( 'Uncaught Error', error );
		}
	});
});
```

### .try( Function )

All mixins calls and `.init()` methods are try/catch wrapped to prevent errors on modules, but for a performance matter, the methods and functions inside a mixin are not wrapped. If you feel that some method has a non-deterministic behavior or it's not possible to know all the possible errors that can be thrown, in that case, you can use the `.try()` method.


**test.js**
```js
define([
	'jails',
	'errors/test.error'
], function( jails ){

	jails.controller('test', function( html, data ){

		this.init = function(){
			this.on('click', 'a', this.try( message ));
		};

		function message(){

			var title = this.title;

			if( title )
				alert( 'Hey, it works! The title is :' + this.title );

			else throw 'link:no-title';
		}
	});
});
```

**test.error.js**
```js
define(['jails'], function( jails ){

	jails.subscribe('throwable@controller:test', function( error ){
		switch( error.message ){
			case 'link:no-title':
				console.error('No attribute [title] was found for that link');
			break;

			default : console.error('Uncaught Error', error);
		}
	});
});
```

### throwable.error

```js
{
	at : String('controller' || 'app'),
	data : controller.data,
	element : HTMLElement,
	message : *,
	module : //Instance of Controller or App
}
```
