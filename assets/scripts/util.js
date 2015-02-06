/**
 * Util 工具方法
 * @author bang
 * @date 2015-2-6
 * @version 1.0
 */
;(function(global, factory) {
	// require.js模块加载
	if (global.define && define.amd) {
		define(factory);
	}
	else {
		global.Util = factory();
	}
})(this, function() {
	var Util = {};

	Util.all = function(id, context) {
		context = context || document;
		return context.querySelectorAll(id);
	};

	Util.each = function(arr, fn) {
		var i = 0;
		for (;i < arr.length; i++) {
			fn && fn.call(arr[i], i);
		}
	};

	// event 模块
	Util.addEvent = function() {

	};
	Util.removeEvent = function() {

	};

	// http请求
	Util.http = function() {

	};

	// 格式 [obj: {}]
	var _cache = [];
	// 数据缓存
	Util.data = {
		// 添加
		add: function(obj) {
			var item = this.getItem(obj);

		},
		// 删除
		remove: function(obj, key) {
			var item = this.getItem(obj),
				index = this.indexOf(obj);

			delete _cache[index][key];
		},
		// 索引
		indexOf: function(obj) {
			var i = 0;
			for (; i < _cache.length; i++) {
				if (_cache[i][0] === obj) {
					return i;
				}
			}
			return -1;
		},
		_getItem: function(obj) {
			var index = this.indexOf(obj),
				item;
			if (index > -1) {
				item = _cache[index];
			}
			else {
				item = [obj, {}];
				_cache.push( item );
			}
			return item;
		}
	}

	if (typeof Map === undefined) {
		var Map = function() {

		};
		extend(Map.prototype, {
			set: function() {

			},
			get: function() {

			}
		})
	}

	// 原生对象扩展
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fn) {
			var ret;
			for (var i = 0; i < this.length; i++) {
				ret = fn.call(this, this[i], i);
				if (ret === false) break;
			}
		}
	}
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(item) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === item) return i;
			}
			return -1;
		}
	}
	if (!Array.isArray) {
		Array.isArray = function() {

		};
	}
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			// return this.replace( /^(( \s+)|( \s+))$/, '' );
			return this.replace(/(^ |\s+)|(\s+| $)/g, '');
		}
	}
	if (!Object.keys) {
		Object.keys = function() {

		};
	}
	return Util;
});