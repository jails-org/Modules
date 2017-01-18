define(function(){
	return function($){
		return{
			on :function(el, ev, callback){
				$(el).on(ev, function(e, data){
					e.detail = data? data.detail :e.detail;
					return callback.call(this, e);
				});
			},
			off:function(el, ev, callback){
				$(el).off(ev);
			},
			trigger :function(el, ev, args){
				$(el).trigger(ev, {detail:args} );
			}
		};
	};
});
