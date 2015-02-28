/**
 * app.js
 */
define(['utils', '../widget/highlight/highlight'], function(utils, hljs) {

	// 导航
	function nav() {
		var lis = utils.select('#header ul li'),
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
			case 'note':
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
		var footer = utils.select('#footer')[0];

		function _fix() {
			footer.className = '';
			var bottom = utils.wHeight() - footer.offsetTop - footer.offsetHeight;
			if (bottom > 0) {
				// utils.addClass(footer, 'fix');
				footer.className = 'fix';
			}
		}
		_fix();
		utils.addEvent(window, 'resize', _fix);
	}
	// 代码块
	function codeBlock() {
		var code = utils.select('pre code'),
				i = 0;
		for (;i < code.length; i++) {
			hljs.highlightBlock( code[i] );
		}
	}
	// 进度条
	function progress() {
		var loading = utils.select('#header .loading-length')[0],
			images = document.images;

		if (images.length > 0) {
			var now = 0,
					u = Math.ceil(100 / images.length),
					yImg;
			for (var i = 0; i < images.length; i++) {
				// 图片预加载
				yImg = new Image();
				yImg.onload = yImg.onerror = function() {
					now++;
					loading.style.width = Math.min(u * now, 100) + '%';
				};
				yImg.src = images[i].src;
			}
		}
		else {
			loading.style.width = '100%';
		}
	}
	utils.ready(function() {
		nav();
		fixFooter();
		codeBlock();
		progress();
	});
});