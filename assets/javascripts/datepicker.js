/**
 * 日历插件
 */
;(function(global, $, undefined) {
var DatePicker, $selector, $DatePicker;

// 选择器
$selector = function(node, content) {
	if (document.querySelectorAll) {
		// 判断是否为element
		var isElement = function() {
			return node === 'Object' && node.nodeName === 1;
		};
		$selector = function(node, content) {
			if (isElement(node)) {
				if (node.length > 0) {
					return node;
				}
				else {
					return [node];
				}
			}
			else {
				return (content || document).querySelectorAll(node);
			}
		};
	}
	else {
		$selector = function(node, content) {
			return $(node, content).get();
		};
	}
	return $selector(node, content);
};
DatePicker = function() {
	this.construct.apply(this, arguments);
};
DatePicker.prototype = {
	// 构造函数
	construct: function(selector, format) {
		this.selector = selector;
		this.format = format;
		this.render();
	},
	render: function() {
		
	}
};

global.$DatePicker = function(node, format) {
	var nodes = $selector(node);
	for (var i = 0; node = nodes[i]; i++) {
		new DatePicker(node, format);
	}
};
})(this, JQuery);