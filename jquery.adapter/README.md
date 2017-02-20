# jquery.adapter

>An adapter to improve Jails support level.

>**Dependencies** :`jquery.js`

>**Version** :`3.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

The current Jails version was build give support to all modern browsers and IE9+.
If you're facing some incompatibility issues with IE older browsers or some mobile browsers, you can solve that incompatibility by adding a new `Event` object to Jails.

Jails uses the `CustomEvent`, `addEventListener` and `dispatchEvent`. These api's are the only reason that Jails might be incompatible with some browser.

So, all you need to do is to add some library that does support the browser you want and tell to Jails to use that library as Event handler. This module is an `Adapter` for some jQuery version that support IE8.


## Usage

On your config file, load up the adapter and plug the interface to the Jails core before it starts.
In the example above, you will see that the adapter is a new dependency and must be loaded with some jquery version.

```js
var jails   = require('jails-js');
var adapter = require('jails-modules/jquery.adapter');
var jquery  = require('jquery');

jails.events = adapter( jquery );
```

And there you go... Now your Jails Application has improved his support level. Cheers!
