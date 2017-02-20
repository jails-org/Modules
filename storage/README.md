# storage

> The storage AMD is just a wrapper for the localStorage and sessionStorage global objects.

>**Version** :`3.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

This AMD module has the simplest way to use the localStorage/sessionStorage object, very useful to persist data on client side.
It is just a wrapper that allows you to storage not only `String` and `Number` but also `Array` and `JSON` objects.

## Usage

### For local storage

```js
//Save data
storage.local.set('item', { my :'item' }); // Save data and return { my:'item' }

//Get data
storage.local.get('item'); // return { my:'item' }

//Delete data
storage.local.remove('item'); // Removes and return { my:'item' }
```

### For session storage

```js
//Save data
storage.session.set('item', { my :'item' }); // Save data and return { my:'item' }

//Get data
storage.session.get('item'); // return { my:'item' }

//Delete data
storage.session.remove('item'); // Removes and return { my:'item' }
```
