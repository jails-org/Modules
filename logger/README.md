# logger

>The official and beta Jails logger.

>**Version** :`2.1.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

Jails architecture relies on messaging strategy once it helps us to decouple our modules. Unfortunately, it turns out that it can be pretty hard to track and debug events in Javascript.

Logger module helps you to visualize all the subscriptions and publishing events and also to easily track your Jails application mistakes from Jails workflow perspective.

## What it does

- #### Modules Mismatches.

    *When you forget to reference the modules on markup or when you forget to inject some module.*

- #### Event Messages

    *Logs all the events happening on Jails application, you can visualize all the calls, messages and responses on your browser's `console`.*


## Usage

```js
define([

	'jails',
	'mods/logger/logger'

], function( jails, logger ){

	jails('sample', function( component, html, data ){

		component.init = function(){
            // Some code here...
		};

	});

    //Always after an Jails.app() call
    //And always outside that function.
	logger();

});

```
