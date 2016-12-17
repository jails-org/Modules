# jsx

>A decoupled JSX templates module ( no event system attached )

>**Version** :`1.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

>**Original**: https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76#.z238xqzco

---

`jsx` module let you to describe programmaticaly jsx templates with the advantage of virtual dom diff.


# Setup

## Install Babel loader, s2015 presets and webpack

```
npm install babel-loader babel-core babel-preset-es2015 webpack --save-dev
```

## Install React JSX Transform Babel Plugin

```
npm install --save babel-plugin-transform-react-jsx
```

## Configure webpack.config.js babel-loader plugin

```js
module: {
	loaders: [{
		loader: 'babel-loader',
		test: /\.js|\.jsx$/,
		exclude: /node_modules/,
		query:{
			presets:['es2015'],
			plugins:[["transform-react-jsx", { "pragma": "jsx.h"}]]
		}
	}]
}
```

# Usage

## Template `item.jsx`

```js
import jsx from 'jails-modules/jsx'

export default jsx(( data )=>{
	return (
		<span id="my-id" className="my-class">
			{ data.i < 3? data.value :'You have clicked more then 3 times!!!' }
		</span>
	)
})
```

## Component `button.js`

```js
import Template from 'item.jsx'

export default( component, button, anno )=>{

    let i       = 0
    let value   = button.innerText
    let update  = Template( element )

	component.init = ()=>{
		component.on('click', onclick)
	}

	const onclick = ()=>{
		i++
		update({ value, i })
	}
}

```

## Markup

```html
<button data-component="button" type="button" class="btn btn-primary">
    <span>Default value</span>
</button>
```
