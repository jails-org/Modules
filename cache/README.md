# cache

>A simple module for caching data, it can be used to save some url of ajax requests for instance.

>**Version** :`1.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

This module is pretty a caching general purposes, but is quite good for ajax calls instances, like, whenever you request an url and you don't want to request that again, you can use the `cache` module to save the visit urls.


## Methods

### .set( String, [Object] ) :`Object`

Set a key and a value. Value can be anything, but key must be `String`.

### .get( String, [Object] ) :`Object`

Get a cached item, if you send something as second parameter it will call the `.set()` method and it will also return the object.

### .remove( [routes] )

Remove the item of the list.

### .destroy()

Flushes the cache object and reset it.

### .data() :`Object`

Returns the internal `data` of cache module.


## Example and Usage

If you are using a SPA application and want to load html files via ajax calls, maybe you want to prevent multiple calls to the same url.

You can save that url and get the result using cache module.


```js

function load(url){

    var promise;
        promise = cache.get(url) ||
                  cache.set(url, $.get( url ) );
    promise.done(function( response ){
        $('body').html( response );
    })
}

load('pages/home.htm');
load('pages/about.htm');
load('pages/contact.htm');
load('pages/about.htm');
load('pages/home.htm');
load('pages/contact.htm');

```

For all the above calls, there will be just 3 ajax calls.
