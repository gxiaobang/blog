/**
 * 主页js
 */

;(function(global) {
	var main;
	// footer在最底部
	function resize() {
		main.style.minHeight = (window.innerHeight || document.documentElement.clientHeight) - 166 + 'px';
	}
	// 代码块
	function makeCode() {
		var codes = document.querySelectorAll('pre code'),
			traTab = function(str) {
				return str.replace(/\t/g, '    ');
			},
			i, code;

		for (i = 0; code = codes[i]; i++) {
			codes[i].innerHTML = traTab(codes[i].innerHTML);
		}
	}
	tw.domReady(function() {
		main = tw.selectorAll('#main')[0];
		tw.on(window, 'resize', resize);
		resize();

		if (tw.isW3C) {
			makeCode();
		}
	});
})(this);

