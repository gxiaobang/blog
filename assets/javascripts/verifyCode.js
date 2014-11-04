/**
 * 生成验证码 VerifyCode
 * author: bang
 * date: 2014-09-16
 */
;(function (global) { 

// 获取随机数
function random(min, max) {
	if (!max) {
		max = min;
		min = 0;
	}
	return Math.random() * (max - min) + min;
}
// 随机16进制颜色
function randomColor() {
	return '#' + (random(0xffffff) | 0).toString(16)
}
// 获取16进制数
function getHEX(digit) {
	digit = digit || 1;
	
	var hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'],
		result = '',
		i = 0,
		num;

	for (i = 0; i < digit; i++) {
		num = Math.floor(Math.random() * hex.length);
		
		if (Math.random() > .5) {
			result += String(hex[num]).toUpperCase();
		}
		else {
			result += hex[num];
		}
		
		hex.splice(num, 1);
	}
	return result;
}
// 绘制字体
function drawText(ctx, str, n, color, width, height) {
	var scaleX = random(.5, 1.5),
		scaleY = random(.5, 1.5),
		rotate = random(-Math.PI/4, Math.PI/4);

	ctx.save();
	ctx.font = '25px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = color;
	ctx.translate(12 * (n + 1), 12);
	ctx.rotate(rotate);
	ctx.scale(scaleX, scaleY);
	
	ctx.fillText(str, 0, 0);
	ctx.restore();
}
// 干扰
function disturb(cvs, ctx) {
	var width = cvs.width,
		height = cvs.height,
		x, y;

	for (var i = 0; i < 20; i++) {
		x = random(width);
		y = random(height);

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = randomColor();
		ctx.arc(x, y, 1.2, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
}
// 清除canvas
function clearRect(cvs, ctx) {
	ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function VerifyCode() {
	this.init.apply(this, arguments);
}
VerifyCode.prototype = {
	init: function(options) {
		this.codeLen = options.codeLen;
		this.width = options.width || 70;
		this.height = options.height || 30;
		this.canvas = options.canvas;
		this.context = this.canvas.getContext('2d');
		this.canvas.style.background = '#ccc';
		this.canvas.style.cursor = 'pointer';

		this.render();
	},
	// 绘制验证码
	drawCode: function() {
		clearRect(this.canvas, this.context);
		disturb(this.canvas, this.context);
		var code = this.code = getHEX(this.codeLen),
			color;
		for (var i = 0; i < code.length; i++) {
			color = randomColor();
			drawText(this.context, code[i], i, color);
		}
	},
	render: function() {
		this.drawCode();
		this.setEvent();
	},
	setEvent: function() {
		var _this = this;
		this.canvas.onclick = function() {
			_this.drawCode();
		};
	},
	getCode: function() {
		return this.code;
	}
};

global.VerifyCode = VerifyCode;

})(this);
