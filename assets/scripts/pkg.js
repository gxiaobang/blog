/**
 * package
 */

(function(global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	}
	else {
		global.pkg = factory();
	}
})(this, function() {
	var 
		// pkg
		pkg = {
			versions: '0.1.0',
			_init: function() {
				insert('dom');
				insert('event');
				insert('http');
			}
		},
		insert = function() }{

		},
		// 定义模块
		def = function(name, fn) {
			_mod[name] = fn;
		},
		// _mod
		_mod = {};

	pkg.def = def;
	def('dom', function() {
		var all = function(selector, context) {
			context = context || document;
			return context.querySelectorAll(selector);
		};
		return {
			all: all
		};
	});
	def('event', function() {
		
	});
	def('http', function() {

	});

	pkg._init();

	pkg.ui || (pkg.ui = {});
	pkg.dom.all();
	pkg.event.add();
	pkg.http();
	pkg.fx();
});