/**
 * 主页js
 */

;(function(global) {
	var main,
		totop,
		timeoutId;
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
	// 获取纵向滚动条距离
	function getScrollY() {
		return document.body.scrollTop || document.documentElement.scrollTop;
	}
	// 返回顶部
	function scrollToTop() {
		clearTimeout(timeoutId);
		// totop.className = '';
		if (getScrollY() > 0) {
			totop.style.display = '';
			setTimeout(function() {
				totop.className = 'totop-show';
			});
		}
		else {
			totop.className = 'totop-hide';
			timeoutId = setTimeout(function() {
				totop.style.display = 'none';
			}, 200);
		}
	}
	// 滚动到顶部
	function moveToTop() {
		var scrollY,
			currentY;
		setTimeout(function run() {
			currentY = getScrollY();
			if (currentY > 0) {
				scrollY = (0 - currentY) / 5;
				scrollY += currentY;
				document.body.scrollTop = scrollY;
				document.documentElement.scrollTop = scrollY;
				setTimeout(run, 20);
			}
		}, 20);
	}
	tw.domReady(function() {
		main = tw.selectorAll('#main')[0];
		totop = tw.selectorAll('#totop')[0];
		
		if (tw.isW3C) {
			makeCode();
		}

		resize();
		makeMenuActive();
		scrollToTop();

		tw.addEvent(totop, 'click', moveToTop);
		tw.addEvent(window, 'scroll', scrollToTop);
		tw.addEvent(window, 'resize', resize);
	});
})(this);

