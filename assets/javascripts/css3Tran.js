/**
 * css3Tran(动画)
 * author: bang
 * date: 2014-11-10
 */

;(function(global, undefined) {
	"use strict";
var css3Tran = function(options) {
		return new css3Tran.fn(options);
	},
	// 设置行间样式
	setStyle = function(elem, propertys) {
		for (var name in propertys) {
			switch (name) {
				case 'transition':
				case 'transform':
					elem.style[propertyNames[name]] = propertys[name];
					break;
				default:
					if (name === 'opacity') {
						elem.style.opacity = propertys[name];
						elem.style.filter = 'alpha(opacity=' + propertys[name] + ')';
					}
					else if (isNaN(propertys[name])) {
						elem.style[name] = propertys[name];
					}
					else {
						elem.style[name] = propertys[name] + 'px';
					}
					break;
			}
		}
	},
	// 创建空的div节点，用于属性支持检测
	node = document.createElement('div'),
	// 样式属性
	propertyNames = function(name) {
		var prefix = ['webkit', 'moz', 'ms'],
			i = 0,
			fullName;
		if (node.style[name] === '') {
			return propertyNames[name] = name;
		}
		else {
			for (; i < prefix.length; i++) {
				fullName = prefix[i] + name.replace(/^[a-z]/, function(match){ return match.toUpperCase(); });
				if (node.style[fullName] === '') {
					return propertyNames[name] = fullName;
				}
			}
		}
	};

// 获取不用浏览器对transition,transform的支持
propertyNames('transition');
propertyNames('transform');

css3Tran.suports = propertyNames.transition !== undefined;
css3Tran.fn = function() {
	this.init.apply(this, arguments);
};
css3Tran.fn.prototype = {
	init: function(options) {
		this.pushThen = [];
		this.completeFns = [];
		// 回放初始值
		// this.isRev = false;
		this.index = 0;
		this.setOptions(options);
		this.run();
	},
	// 参数配置
	setOptions: function(options) {
		this.elem = this.elem || options.elem;
		this.to = options.to || {};
		this.from = options.from || {};
		this.duration = this.duration || options.duration;
		this.func = this.func || options.func;
		// this.complete = options.complete;
	},
	// 启动
	run: function() {
		var _this = this;

		this.cssText = this.elem.style.cssText;
		if (css3Tran.suports) {
			this.tranStart();
			setStyle(this.elem, this.from);
			setStyle(this.elem, {transition: (this.duration || '.4s') + (this.func ? ' ' + this.func : ' ease')});
			this.elem.addEventListener('transitionend', function func(event) {
				event = event || window.event;
				if (event.propertyName === _this.lastPropertyName) {
					_this.tranEnd(func);
				}
				event.preventDefault();
			}, false);
			setTimeout(function() {
				_this.toTarget();
			});
		}
		else {
			setTimeout(function() {
				if (_this.pushThen.length) {
					_this.setOptions(_this.pushThen[_this.pushThen.length - 1]);
				}
				_this.toTarget();
				_this.completeFns.forEach(function(fn) {
					fn && fn.call(_this);
				});
			});
		}
	},
	tranStart: function() {
		var keys = Object.keys(this.to);
		this.lastPropertyName = keys[keys.length - 1];
	},
	// 结束
	tranEnd: function(func) {
		var _this = this;
		if (this.pushThen[this.index]) {
			this.setOptions(this.pushThen[this.index]);
			this.tranStart();
			this.toTarget();
			this.index++;
		}
		else {
			setStyle(this.elem, {transition: ''});
			// 删除结束事件
			this.elem.removeEventListener('transitionend', func);
			this.completeFns.forEach(function(fn) {
				fn && fn.call(_this);
			});
		}
	},
	// 回放
	reverse: function() {
		this.elem.style.cssText = this.cssText;
	},
	// to target
	toTarget: function() {
		setStyle(this.elem, this.to);
	},
	// 继续
	then: function(options) {
		this.pushThen.push(options);
		return this;
	},
	// 完成
	complete: function(fn) {
		this.completeFns.push(fn);
	}
};
global.css3Tran = css3Tran;
})(this);