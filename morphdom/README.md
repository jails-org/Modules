# morphdom

> An adapter to use morphdom with jails.

>**Version** :`3.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

---

This module is an adapter to use [morphdom](https://github.com/patrick-steele-idem/morphdom), which is an excellent implementation for diffing dom changes, with `jails` structure.

We highly recommend to use it with [bel](https://github.com/shama/bel) to create dom elements using Template Strings.


## Usage

```js
import morphdom from 'jails-modules/morphdom'
import template from './template'

jails('my-component', ( {init, elm} )=>{

	let initialState = { initial : true }
	let render = morphdom( elm, template, initialState )

	init(()=>{
		render( { initial : false })
	})
})

```

`template.js`

```js
import html from 'bel'

export default ( state = {} )=>{

	if( state.initial )
		return html`<p>It's initial state!</p>`

	return html`<p>It's no longer the initial state</p>`
}
```
