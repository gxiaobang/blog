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

	// 当前页menu
	function makeMenuActive() {
		var header_menu = tw.selectorAll('#header_menu')[0],
			posi = header_menu.getAttribute('data-posi'),
			menu_li, i;

		for (i = 0; menu_li = header_menu.children[i]; i++) {
			if (tw.getText(menu_li).toLowerCase() === posi) {
				menu_li.className = 'active';
				break;
			}
		}
	}
	tw.domReady(function() {
		main = tw.selectorAll('#main')[0];
		tw.addEvent(window, 'resize', resize);
		resize();

		if (tw.isW3C) {
			makeCode();
		}

		makeMenuActive();
	});
})(this);

