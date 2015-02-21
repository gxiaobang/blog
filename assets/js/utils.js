/**
 * utils 工具方法
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
		global.utils = factory();
	}
})(this, function() {
	"use strict";
	var utils = {
		_init: function() {

		},
		version: 1.0
	},
		TOSTR = Object.prototype.toString;

	// 数据类型检测
	function typeOf(obj) {
		if (obj === null) {
			return 'Null';
		}
		else {
			return TOSTR.call(obj).substring(8).replace(']', '');
		}
	}
	utils.typeOf = typeOf;

	// 选择器
	function select(id, context) {
		context = context || document;
		return context.querySelectorAll(id);
	}
	utils.select = select;

	// 样式
	function setStyle(el, prop, val) {
		if (typeOf(prop) === 'String' && typeOf(val) === 'String') {
			el.style[prop] = val;
		}
		else {
			for (var name in prop) {
				el.style[name] = props[name];
			}
		}
	}
	function getStyle(el, prop) {

	}
	utils.setStyle = setStyle;
	utils.getStyle = getStyle;

	// dom
	// html字符转成dom节点
	function parseHTML(html) {
		var range = document.createRange();
		range.selectNodeContents(document.body);
		parseHTML = function(html) {
			return range.createContextualFragment(html);
		};
		return parseHTML(html);
	}
	function insertHTML(el, where, html) {
		if (el.insertAdjacentHTML) {
			insertHTML = function(el, where, html) {
				return el.insertAdjacentHTML(where, html);
			};
		}
		else {
			insertHTML = function(el, where, html) {
				var elem = parseHTML(html);
				switch (where) {
					case 'beforebegin':
						el.parentNode.insertBefore(elem, el);
						break;
					case 'beforeend':
						if (el.firstChild) {
							el.insertBefore(elem, firstChild);
						}
						else {
							el.appendChild(elem);
						}
						break;
					case 'afterbegin':
						el.appendChild(elem);
						break;
					case 'afterend':
						if (el.nextSibling) {
							el.parentNode.insertBefore(elem, el.nextSibling);
						}
						else {
							el.parentNode.appendChild(elem);
						}
						break;
				}
			};
		}
		insertHTML(el, where, html);
	}
	function getText(elem) {
		return elem.textContent || elem.innerText;
	}

	// 添加事件
	function addEvent(el, type, fn) {
		el.addEventListener(type, fn ,false);
	}
	// 移除事件
	function removeEvent(el, type, fn) {
		el.removeEventListener(type, fn);
	}
	// dom加载
	function domReady(fn) {
		var fns = [];

		function isReady() {
			return /complete/.test(document.readyState);
		}
		function handler() {
			for (var i = 0; i < fns.length; i++) {
				fns[i]();
			}
			fns = null;
			removeEvent(document, 'DOMContentLoaded', handler);
			removeEvent(window, 'load', handler);
		}

		if (!isReady()) {
			addEvent(document, 'DOMContentLoaded', handler);
			addEvent(window, 'load', handler);
		}
		// 重写domReady
		domReady = function(fn) {
			if (!isReady()) {
				fns.push(fn);
			}
			else {
				fn && fn();
			}
		};
		domReady(fn);
	}
	// event 模块
	utils.addEvent = addEvent;
	utils.removeEvent = removeEvent;
	utils.ready = function(fn) {
		domReady(fn);
	};

	// window大小
	function wHeight() {
		var h = window.innerHeight || document.documentElement.clientHeight;
		return h;
	}
	function wWidth() {
		var w = window.innerWidth || document.documentElement.clientWidth;
		return w;
	}

	utils.wHeight = wHeight;
	utils.wWidth = wWidth;
	
	// fx
	function fx() {

	}
	fx.default = {

	};
	utils.fx = fx;

	// http请求
	function http() {

	}
	utils.http = http;

	// 格式 [obj: {}]
	var _cache = [];
	// 数据缓存
	utils.data = {
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
		Array.isArray = function(obj) {
			return typeOf(obj) === 'Array';
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
	if (!Function.prototype.bind) {

	}
	// window.utils = utils;
	return utils;
});