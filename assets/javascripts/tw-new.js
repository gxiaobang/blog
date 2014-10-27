/**
 * 工具函数
 * author: bang
 * date: 2014-10-15
 */
console.time('time: ');
(function(global) {
var tw = {
	versions: '1.0',
	isW3C: !!document.dispatchEvent
};

// html字符转成dom节点
function parseHTML(html) {
	var range = document.createRange();
	range.selectNodeContents(document.body);
	parseHTML = function(html) {
		return range.createContextualFragment(html);
	};
	return parseHTML(html);
}
/**
 * 插入dom
 * @param  {Object} el    目标节点
 * @param  {String} where 插入位置
 * @param  {String} html  
 */
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

// 获取node
function selectorAll(selector, context) {
	if (document.querySelectorAll) {
		selectorAll = function(selector, context) {
			return (context || document).querySelectorAll(selector);
		};
	}
	else if(global.JQuery) {
		(function($) {
			selectorAll = function() {
				return $(selector, context).get();
			};
		})(JQuery);
	}
	else {
		selectorAll = function(selector, context) {
			return new Sizzle(selector, context);
		};
	}
	return selectorAll(selector, context);
}
// 获取文本
function getText(elem) {
	return elem.textContent || elem.innerText;
}

// 事件绑定
function addEvent(elem, evt, fn) {
	if (tw.isW3C) {
		elem.addEventListener(evt, fn, false);
	}
	else {
		elem.attachEvent('on' + evt, fn);
	}
}
function removeEvent(elem, evt, fn) {
	if (tw.isW3C) {
		elem.removeEventListener(evt, fn);
	}
	else {
		elem.detachEvent('on' + evt, fn);
	}
}

// dom加载
function domReady(fn) {
	var done = false,
		fns = [],
		handler;


	domReady = function(fn) {
		if (!done) {
			fns.push(fn);
		}
		else {
			fn.call(document);
		}
	}

	domReady(fn);
	if (tw.isW3C) {
		handler = function() {
			done = true;
			fns.forEach(function(item) {
				item.call(document);
			});
			fns = null;
		};
		document.addEventListener('DOMContentLoaded', handler, false);
		document.addEventListener('load', handler, false);
	}
	else {
		handler = function() {
			if (/complete/.test(document.readyState)) {
				done = true;
				fns.forEach(function(item) {
					item.call(document);
				});
				fns = null;
			}
		};
		document.attachEvent('onreadystatechange', handler);
		document.attachEvent('onload', handler);
	}
}
// 目标添加对象
function assign() {
	var args = arguments,
		result;
	if (Object.assign) {
		result = Object.assign.apply(this, args);
	}
	else {
		result = {};
		for (var i = 0; arg = args[i]; i++) {
			for (var key in arg) {
				if (arg.hasOwnProperty(key)) {
					result[key] = arg[key];
				}
			}
		}
	}
	return result;
}
// 定义类
function Klass(options, parent) {
	var Klass;

	// 父类
	if (parent) {
		options = assign(parent.prototype, options);
		options.parent = function() {
	    	parent.prototype.construct.apply(this, arguments);
		};
	}

	Klass = options.construct;
	Klass.prototype = options;
	// 修正实例指向
	Klass.prototype.constructor = Klass;
	return Klass;
}
// getBoundingClientRect
function getClientRect(elem) {
	if (elem.getBoundingClientRect) {
		return elem.getBoundingClientRect();
	}
	else {
		var rect = { top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 };
		rect.width = elem.offsetWidth;
		rect.height = elem.offsetHeight;
		rect.top = getTop(elem);
		rect.left = getLeft(elem);
		rect.right = rect.width + rect.left;
		rect.bottom = rect.height + rect.top;
		return rect;
	}
}
// 拖动
function draggable(elem, fns) {
	var isPress = false,
		rect = getClientRect(elem.offsetParent),
		draggbegin,
		dragging,
		draggend;
		

	if (!fns) fns = {};
	dragbegin = function(event) {
		event = event || window.event;

		isPress = true;
		fns.begin && fns.begin.call(this);
	};
	dragging = function(event) {
		var x, y;
		if (isPress) {
			event = event || window.event;
			x = event.clientX - rect.left;
			y = event.clientY - rect.top;
			elem.style.left = x + 'px';
			elem.style.top = y + 'px';
			fns.move && fns.move.call(this, x, y);
		}
	};
	dragend = function() {
		if (isPress) {
			isPress = false;
			fns.end && fns.end.call(this);
		}
	};
	tw.addEvent(elem, 'mousedown', dragbegin);
	tw.addEvent(document, 'mousemove', dragging);
	tw.addEvent(document, 'mouseup', dragend);
}

// 原生对象自定义方法
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fn) {
		var i, result;
		for (i = 0; i < this.length; i++) {
			result = fn(this[i], i);
			// 相当于在loop中break
			if (result === false) return;
		}
	};
}

tw.insertHTML = insertHTML;
tw.parseHTML = parseHTML;
tw.selectorAll = selectorAll;
tw.addEvent = addEvent;
tw.removeEvent = removeEvent;
tw.getText = getText;
tw.domReady = domReady;
tw.Klass = Klass;
tw.draggable = draggable;

global.tw = tw;
})(this);
console.timeEnd('time: ');