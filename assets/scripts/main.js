/**
 * main.js
 */

define(['util'], function(Util) {
	/*COM.ready(function() {

	});
	COM.removeEvent(obj, 'click', function() {

	});*/
	// console.log(Util);
	var pageHeader = Util.all('#header')[0],
		navbarNav = Util.all('ul', pageHeader)[0],
		navbarList = Util.all('li', navbarNav);

	var loc = location.pathname.split(/\/+/)[1],
			now = 0;

	// console.log( location.pathname );
	switch (loc) {
		case '':
		case 'index':
			now = 0;
			break;
		case 'article':
			now = 1;
			break;
		case 'about':
			now = 2;
			break;
		case 'contact':
			now = 3;
			break;
	}
	navbarList[now].className = 'active';
});

/*;(function(global) {
	var main,
		totop,
		timeoutId;
	// footer在最底部
	function resize() {
		main.style.minHeight = (window.innerHeight || document.documentElement.clientHeight) - 116 + 'px';
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
			loc = header_menu.getAttribute('data-loc'),
			menu_li, i;

		for (i = 0; menu_li = header_menu.children[i]; i++) {
			if (tw.getText(menu_li).toLowerCase() === loc) {
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
		

		resize();
		makeMenuActive();
		scrollToTop();

		tw.addEvent(totop, 'click', moveToTop);
		tw.addEvent(window, 'scroll', scrollToTop);
		tw.addEvent(window, 'resize', resize);
	});
})(this);
*/
