/**
	@author: https://medium.com/@deathmood
	@url: https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76#.z238xqzco
*/
define(['jails'], function( jails ){

	var components = false;

	var f = function( arrowf ){

		return function( element ){
			var oldnode;
			return function( state ){

				if( !oldnode )
					element.innerHTML = '';

				var newnode = arrowf( state );
				updateElement( element, newnode, oldnode );

				if(components)
					jails.start( element );

				components = false;
				oldnode = newnode;
			}
		};
	}

	f.h = function( type, props, children ){

		var args  = Array.prototype.slice.call( arguments );
		var type  = args.shift();
		var props = args.shift()||{};

		children  = [].concat.apply([], args);
		return { type:type, props: props || {}, children:children };
	};

	function setBooleanProp($target, name, value) {
		if (value) {
			$target.setAttribute(name, value);
			$target[name] = true;
		} else {
			$target[name] = false;
		}
	}

	function setProp($target, name, value) {
		if (name === '_src' && value) {
			$target.setAttribute('src', value);
		}  else if (name === 'className') {
			$target.setAttribute('class', value);
		} else if (name === 'value') {
			$target.value = value;
		}  else if (typeof value === 'boolean') {
			setBooleanProp($target, name, value);
		} else {
			$target.setAttribute(name, value);
		}
	}

	function removeBooleanProp($target, name) {
		$target.removeAttribute(name);
		$target[name] = false;
	}

	function removeProp($target, name, value) {
		if (name === 'className') {
			$target.removeAttribute('class');
		}else if (name === '_src') {
			$target.removeAttribute('src');
		}else if( name === 'value'){
			$target.value = '';
		}else if (typeof value === 'boolean') {
			removeBooleanProp($target, name);
		} else {
			$target.removeAttribute(name);
		}
	}

	function setProps($target, props) {
		Object.keys(props).forEach(function(name){
			setProp($target, name, props[name]);
		});
		if( 'data-component' in props )
			components = true;
	}

	function updateProp($target, name, newVal, oldVal) {
		if (!newVal) {
			removeProp($target, name, oldVal);
		} else if (!oldVal || newVal !== oldVal) {
			setProp($target, name, newVal);
		}
	}

	function updateProps($target, newProps, oldProps) {
		oldProps = oldProps || {};
		var props = Object.assign({}, newProps, oldProps);
		Object.keys(props).forEach(function(name){
			updateProp($target, name, newProps[name], oldProps[name]);
		});
	}

	function createElement(node) {
		if (typeof node === 'string') {
			return document.createTextNode(node);
		}

		var $el = document.createElement(node.type);
		setProps($el, node.props);
		node.children.map(createElement).forEach($el.appendChild.bind($el));
		return $el;
	}

	function changed(node1, node2) {
		return typeof node1 !== typeof node2 ||
		typeof node1 === 'string' && node1 !== node2 ||
		node1.type !== node2.type ||
		node1.props && node1.props.forceUpdate;
	}

	function updateElement($parent, newNode, oldNode, index) {
		index = index || 0;
		if (!oldNode) {
			$parent.appendChild(createElement(newNode));
		} else if (!newNode) {
			if ( index >= $parent.childNodes.length )
				index = $parent.childNodes.length -1;
			$parent.removeChild( $parent.childNodes[ index ] );
		} else if (changed(newNode, oldNode)) {
			$parent.replaceChild(createElement(newNode),$parent.childNodes[index]);
		} else if (newNode.type) {
			updateProps( $parent.childNodes[index], newNode.props, oldNode.props );
			var newLength = newNode.children.length;
			var oldLength = oldNode.children.length;
			for (var i = 0; i < newLength || i < oldLength; i++) {
				updateElement($parent.childNodes[index],newNode.children[i],oldNode.children[i],i);
			}
		}
	}

	return f;
});
