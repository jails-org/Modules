# logger

> A simple Jails logger.

>**Version** :`3.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

Jails architecture relies on messaging strategy once it helps us to decouple our modules. Unfortunately, it turns out that it can be pretty hard to track and debug events in Javascript. Logger can help on development by guessing what is wrong with your application showing url with some useful notes and hints.


## Usage

```js
var jails  = require('jails');
var logger = require('jails-modules/logger');

logger( jails );
jails.start();

```
