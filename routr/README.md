# routr

> Simple AMD module for hash routing.

>**Version** :`3.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)


## Usage

```js
routr()
    .get('/my/url', function(){ console.log('Hi, I am at My Url'); })
    .get('/my/other', function{ console.log('Hit other url'); })
    .get('/now/:myparameter', function( parameter ){ console.log('Now with parameters :', parameter); })
    .get('/:two/:parameters', function( first, second ){ console.log('Parameters', first, second); } )
    .run() // If I want to check location url right away
    .watch() // Bind onhashchange Event on window
```

## Methods

### .get( String, Function );
Sets the url pattern to match, it must be string, and calls a function if it matches.

### .set( JSON );
Initialize a set of patterns if you don't want to call `.get` method multiple times.

```js
routr().set({
    '/my/url' :function(){},
    '/my/other/url' :function(){},
    '/:the/:last/:one' :function(){}
}).run();
```

The routr constructor is a shortcut to `.set` method.
```js
routr({
    '/some/url' :function(){},
    '/other/url':function(){}
}).run();
```

### .run( [String] );
You need to call `.run` method in order to check the url patterns. You can choose to pass a string with a url to be matched, otherwise **routr** will compare the pattern's rules with `location.hash`.

You might wondering why that `.run` method isn't called automatically. Well, there're some cases where your routr is ready before other module in your page, so, if your module depends on routr, and it's not ready yet, routr will try to call your method before it exists. Also when you want to run routr after an ajax call.

This method is specially useful if you have any ajax calls on page load.

### .watch();

This method is used to listen to browser's location property. Every changes on `location.hash` will trigger the routr's matcher and fires a callback if there's any match.
