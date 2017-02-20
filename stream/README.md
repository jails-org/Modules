# Stream

> A function that debounce dom events and returns them as a list of events to be mapped.

>**Version** :`3.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

Stream is just an alternative if you want a stream of events without having to load up the entire `Rx.js` library.

## Usage

```js
var button = document.querySelector('button');
button.addEventListener('click', stream( dblclick, 250 ));

function dblclick( $s ){
    if( $s.length == 2 ){
        console.log('Double clicked in ', $s[0].target);
    }
}
```
