/**
 * 弹窗(Dialog)
 * author: bang
 * date: 2014-11-7
 */

;(function(global, undefined) {
	"use strict";

var Dialog,
	// 获取overlay
	getElem,
	overlay,
	// 事件
	addEvent,
	removeEvent,
	// 数据缓存
	dataCache,
	forEach;

overlay = function() {
	if (!overlay.node && !document.body.contains(overlay.node)) {
		overlay.node = getElem('.overlay')[0];
	}
	return overlay.node;
};
getElem = function(elem, context) {
	context = context || document;
	return context.querySelectorAll(elem);
};
dataCache = {
	data: [],
	// 添加
	add: function(target, key, value) {
		var item = this.find(target);
		if (!item) {
			// 初始化
			item = [target, {}];
			this.data.push(item);
		}
		if (!item[1][key]) {
			item[1][key] = [];
		}
		item[1][key].push(value);
	},
	// 删除
	remove: function(target, key, value) {
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i][0] === target) {
				if (this.data[i][1][key]) {
					for (var j = 0; j < this.data[i][1][key].length; j++) {
						if (this.data[i][1][key][j] === value) {
							this.data[i][1][key].splice(j, 1);
							return true;
						}
					}
				}
			}
		}
		return false;
	},
	find: function(target, key) {
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i][0] === target) {
				if (key) {
					if (this.data[i][1][key]) {
						return this.data[i][1][key];
					}
				}
				else {
					return this.data[i];
				}
			}
		}
		return null;
	}
};
addEvent = function(elem, eventType, fn) {
	var evt = eventType.substring(0, eventType.indexOf('.'));
	dataCache.add(elem, eventType, fn);
	elem.addEventListener(evt, fn, false);
};
removeEvent = function(elem, eventType, fn) {
	var evt = eventType.substring(0, eventType.indexOf('.')),
		fns, removed;
	if (fn) {
		fns = [fn];
	}
	else {
		fns = dataCache.find(elem, eventType);
	}
	for (var i = 0; i < fns.length; i++) {
		elem.removeEventListener(evt, fns[i]);
		removed = dataCache.remove(elem, eventType, fns[i]);
		if (removed) {
			i--;
		}
	}
};
// 数组遍历
forEach = function(arr, fn) {
	var i = 0,
		result;
	for (; i < arr.length; i++) {
		result = fn(arr[i], i);
		if (result === false) {
			break;
		}
	}
};

Dialog = function() {
	this.init.apply(this, arguments);
};
Dialog.prototype = {
	init: function(options) {
		this.overlay = overlay();
		this.dialog = getElem('.dialog', this.overlay)[0];
		this.header = getElem('header', this.dialog)[0];
		this.title = options.title || '信息';
		this.log = options.log || '';
		this.width = options.width || 300;
		this.height = options.height || 160;
		this.btns = options.btns || [{text: '确定'}];
		this.setup();
	},
	// 设置
	setup: function() {
		this.setBox();
		this.initDisplay();
		this.makeCenter();
		this.initEvent();
		this.show();
	},
	// 弹窗大小
	setBox: function() {
		this.dialog.style.width = this.width + 'px';
		this.dialog.style.height = this.height + 'px';
	},
	// 弹窗中心位置
	makeCenter: function() {
		this.dialog.style.left = (document.documentElement.clientWidth - parseInt(this.dialog.style.width)) / 2 + 'px';
		this.dialog.style.top = (document.documentElement.clientHeight - parseInt(this.dialog.offsetHeight)) / 2 + 'px';
	},
	initDisplay: function() {
		getElem('.dialog-info', this.dialog)[0].innerHTML = this.log;
		getElem('.dialog-header>h3', this.dialog)[0].innerHTML = this.title;
	},
	// 事件初始化
	initEvent: function() {
		var _this = this,
			btnsElem = getElem('.dialog-btns', this.dialog)[0];

		getElem('.dialog-close', this.dialog)[0].onclick = function() {
			_this.hide();
		};

		// 添加所需的按钮
		btnsElem.innerHTML = '';
		forEach(this.btns, function(item) {
			var btn = document.createElement('button');
			btn.innerHTML = item.text;
			btn.onclick = function() {
				item.handler && item.handler.call(this);
				_this.hide();
			};
			btnsElem.appendChild(btn);
		});
		this.draggable();
		addEvent(window, 'resize.dialog', function() {
			_this.makeCenter();
		});
	},
	// 拖曳
	draggable: function() {
		var _this = this;
		this.header.onmousedown = function(event) {
			var differX,
				differY,
				_move,
				_end;

			event = event || window.event;
			differX = event.clientX - _this.dialog.offsetLeft;
			differY = event.clientY - _this.dialog.offsetTop;
			_move = function(event) {
				event = event || window.event;
				var left = event.clientX - differX,
					top = event.clientY - differY;

				_this.dialog.style.left = left + 'px';
				_this.dialog.style.top = top + 'px';
				return false;
			};
			_end = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			};
			document.onmousemove = _move;
			document.onmouseup = _end;
			return false;
		};
	},
	// 隐藏
	hide: function() {
		var _this = this;
		css3Tran({
			elem: this.dialog,
			to: {
				transform: 'scale(1.4)',
				opacity: 0
			},
			duration: '.4s'
		})
		.complete(function() {
			_this.overlay.style.display = 'none';
		});


		// 删除事件
		removeEvent(window, 'resize.dialog');
	},
	// 显示
	show: function() {
		var _this = this;
		this.overlay.style.display = '';
		css3Tran({
			elem: this.dialog,
			from: {
				transform: 'scale(1.4)',
				opacity: 0
			},
			to: {
				transform: 'scale(1)',
				opacity: 1
			},
			duration: '.4s'
		});
	}
};
global.Dialog = Dialog;
})(this);