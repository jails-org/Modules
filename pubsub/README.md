# pubsub

> Simple AMD module for Pub/Sub implementation.

>**Version** :`1.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

> Inspired by: http://dev.housetrip.com/2014/09/15/decoupling-javascript-apps-using-pub-sub-pattern/

## Usage

```js
require(['pubsub'], function( Pubsub ){

    Pubsub.subscribe('some:pattern', function( options ){
        console.log('something to do on some:pattern event', options);
    });

    Pubsub.publish('some:pattern', { some:' some options' });
});
```

## Methods

### .subscribe( String, Function);
Register an custom event and attaches a function to it.

### .publish( String, [ * ]);
Notify or triggers an event and it can send parameters to the callbacks.

### .create();
Pubsub is already an instance, if you want to create a new one you can call `.create` method.

```js
require(['pubsub'], function( Pubsub ){

    var A = Pubsub;
    var B = Pubsub.create();

    A.subscribe('some:pattern', function( options ){
        console.log('A: something to do on some:pattern event', options);
    });

    B.subscribe('some:pattern', function( options ){
        console.log('B: something to do on some:pattern event', options);
    });

    // Pub A won't conflict with Pub B.
    A.publish('some:pattern', { some:' some options' });
    B.publish('some:pattern', { some:' some options' });
});
```
