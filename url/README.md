# url

> The **url** module helps you to redirect application url easily. It will change only the hash from `location` object, used on *deeplink* applications.

>**Version** :`1.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

## Properties

### .root

You can set your root for deeplink url, the default is `#`.

If you prefer hash bang style, you can use this property to change root context:

```js
url.root = '#!'
```

## Methods

### .get() : `string`

Returns the path of application without `#`.

```js
url.get()
//-> /my/path/home
```

### .path() : `string`

The same as `.get` but with `#` included.
```js
url.get()
//-> #!/my/path/home
```

*It will contain the bang if you set it on `.root` property*

### .redirect( {} )

Json object will be serialized to a string, and url will be updated with the new uri.

```js
url.get()
//-> /my/path/home
url.redirect({ user :4 });
//-> /user/4
```
### .redirect( string )
You can explicit sends the url to redirect method.

```js
url.redirect('/user/4');
//-> /user/4
```

### .redirect( string, {} )
You can also use a mix of them, if you prefer.
```js
url.redirect('home', {my :'page'});
//-> /home/my/page
url.redirect('', {user :2});
//-> /user/2
```
