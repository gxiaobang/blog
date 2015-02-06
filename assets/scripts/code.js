/**
 * 代码块
 */
(function() {
	var codes = document.querySelectorAll('pre code'),
		traTab = function(str) {
			return str.replace(/\t/g, '    ');
		},
		i, code;

	for (i = 0; code = codes[i]; i++) {
		codes[i].innerHTML = traTab(codes[i].innerHTML);
	}
})();