/**
 * console.js
 * 没有console对象，创建空的console
 */
;(function(global) {
if (global.console) {
	return;
}
// 创建空的console对象
var _console = {},
	methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
	i, key;

for (i = 0; key = methods[i]; i++) {
	_console[key] = function() {
		// 不做处理
		return 0;
	};
}

global.console = _console;
})(this);