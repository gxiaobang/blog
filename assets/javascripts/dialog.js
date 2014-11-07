/**
 * 模拟弹窗
 */

;(function(global) {
var Dialog,
	// 获取overlay
	getOverlay,
	getElem,
	overlay,
	css3Tran;
Dialog = function() {
	this.init.apply(this, arguments);
};
getOverlay = function() {
	if (!overlay && !document.body.contains(overlay)) {
		overlay = getElem('.overlay')[0];
	}
	return overlay;
};
getElem = function(elem, context) {
	context = context || document;
	return context.querySelectorAll(elem);
};
css3Tran = function(options) {
	var oldCssText = options.elem.style.cssText;
	for (var o in (options.from || {})) {
		options.elem.style[o] = options.from[o];
	}
	options.elem.addEventListener('transitionend', function() {
		// 删除结束事件
		this.removeEventListener('transitionend', arguments.callee);
		options.elem.style.cssText = oldCssText;
		options.complete && options.complete.call(this);
	}, false);
	setTimeout(function() {
		options.elem.style.transition = options.duration || '.4s';
		for (var o in (options.to || {})) {
			options.elem.style[o] = options.to[o];
		}
	});
};
Dialog.prototype = {
	init: function(options) {
		this.overlay = getOverlay();
		this.dialog = getElem('.dialog', this.overlay)[0];
		this.header = getElem('header', this.dialog)[0];
		this.log = options.log;
		this.width = options.width || 300;
		this.height = options.height || 160;
		this.setup();
	},
	// 设置
	setup: function() {
		this.setBox();
		this.makeInfo();
		this.evInit();
		this.show();
		this.makeCenter();
		this.showAnim();
	},
	// 弹窗大小
	setBox: function() {
		this.dialog.style.width = this.width + 'px';
		this.dialog.style.height = this.height + 'px';
	},
	// 弹窗中心位置
	makeCenter: function() {
		this.dialog.style.left = (document.documentElement.clientWidth - this.dialog.offsetWidth) / 2 + 'px';
		this.dialog.style.top = (document.documentElement.clientHeight - this.dialog.offsetHeight) / 2 + 'px';
	},
	// 输出信息
	makeInfo: function() {
		getElem('.dialog-info', this.overlay)[0].innerHTML = this.log || '';
	},
	// 拖曳
	drag: function() {
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
	// 事件初始化
	evInit: function() {
		var _this = this;
		getElem('.dialog-close', this.dialog)[0].onclick = 
		getElem('.dialog-confirm', this.dialog)[0].onclick = 
			function() {
				_this.hidden();
			};
		this.drag();
	},
	// 隐藏
	hidden: function() {
		var _this = this;
		css3Tran({
			elem: this.dialog,
			to: {
				transform: 'scale(1.3)',
				opacity: 0
			},
			complete: function() {
				_this.overlay.style.display = 'none';
			},
			duration: '.3s'
		});
	},
	// 显示
	show: function() {
		var _this = this;
		this.overlay.style.display = '';
	},
	showAnim: function() {
		css3Tran({
			elem: this.dialog,
			from: {
				transform: 'scale(1.3)',
				opacity: 0
			},
			to: {
				transform: 'scale(1)',
				opacity: 1
			},
			duration: '.3s'
		});
	}
};
global.Dialog = Dialog;
})(this);