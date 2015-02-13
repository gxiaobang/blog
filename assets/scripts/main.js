/**
 * main.js
 */

define(['util'], function(Util) {
	/*COM.ready(function() {

	});
	COM.removeEvent(obj, 'click', function() {

	});*/
	// console.log(Util);
	/*var dom = Util.require('dom'),
			css = Util.require('css'),
			http = Util.require('http'),
			_event = Util.require('event');

	_event.bind();
	_event.unbind();*/

	// 导航
	function nav() {
		var lis = Util.select('#header ul li'),
				splits = location.pathname.split(/\/+/),
				path,
				now;

		// baseurl: /blog
		if (splits[1] === 'blog') {
			path = splits[2];
		}
		else {
			path = splits[1];
		}

		switch (path.toLowerCase()) {
			case '':
			case 'index':
				now = 0;
				break;
			case 'articles':
				now = 1;
				break;
			case 'about':
				now = 2;
				break;
			case '#':
				now = 3;
				break;
			default:
				now = 3;
		}
		lis[now].className = 'active';
	}
	// 定位footer
	function fixFooter() {
		var footer = Util.select('#footer')[0];

		function _fix() {
			footer.className = '';
			var bottom = Util.wHeight() - footer.offsetTop - footer.offsetHeight;
			if (bottom > 0) {
				// Util.addClass(footer, 'fix');
				footer.className = 'fix';
			}
		}
		_fix();
		Util.addEvent(window, 'resize', _fix);
	}

	Util.ready(function() {
		nav();
		fixFooter();
	});
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
