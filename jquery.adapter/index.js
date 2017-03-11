// For a complete compatibitily across browsers, including IE8, please use jQuery 1.9.1
// code.jquery.com/jquery-1.9.1.min.js

;(function(){

	var Adapter = function($){

		return {

			on :function(el, ev, callback){

				if( callback.call )
					$(el).on(ev, handler(callback));
				else
					Object.keys(callback).forEach(function( selector ){
						$(el).on(ev, selector, handler(callback[selector]));
					});
				function handler( cb ){
					return function(e, data){
						e.detail = data? data.detail :e.detail;
						e.detail = e.detail || {};
						return cb.apply(this, [e].concat(e.detail.args));
					}
				}
			},

			off:function(el, ev, callback){
				$(el).off(ev, callback);
			},

			trigger :function(el, ev, args){
				$(el).trigger(ev, {detail:args} );
			}
		};
	};

	// UMD export
	if ( typeof define === 'function' && define.amd ) {
		define(function () { return Adapter; });
	} else if ( typeof module !== 'undefined' && module.exports ){
		module.exports = Adapter;
	} else {
		window.Adapter = Adapter;
	}
})();
