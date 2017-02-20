# vdom

>A decoupled and simple virtual dom implementation

>**Version** :`3.0.0`

>**Author**: [Eduardo Ottaviani](//github.com/Javiani)

>**Original**: https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76#.z238xqzco

---

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
			plugins:[["transform-react-jsx", { "pragma": "vdom.h"}]]
		}
	}]
}
```

# Usage

## Template `item.jsx`

```js
var vdom = require('jails-modules/vdom');
module.exports = vdom(function(data){
	return (
		<span id="my-id" className="my-class">
			{ data.i < 3? data.value :'You have clicked more then 3 times!!!' }
		</span>
	);
});
```

## Component `button.js`

```js
var Template = require('./item.jsx');

module.exports = function( component, button, props ){

	var i       = 0;
    var value   = button.innerText;
    var update  = Template( element );

	component.init(function(){
		component.on('click', onclick);
	});

	function onclick(){
		i++;
		update({ value:value, i:i });
	}
};
```

## Markup

```html
<button data-component="button" type="button" class="btn btn-primary">
    <span>Default value</span>
</button>
```
