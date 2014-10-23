/**
 * 工具函数
 * author: bang
 * date: 2014-10-15
 */

(function(global) {
var tw = {
	versions: '1.0'
};


// 字符转成dom
function parseHTML(html) {
	var range = document.createRange();
	range.selectNodeContents(document.body);
	parseHTML = function(html) {
		return range.createContextualFragment(html);
	};
	return parseHTML(html);
}
/**
 * 插入dom
 * @param  {Object} el    目标节点
 * @param  {String} where 插入位置
 * @param  {String} html  
 */
function insertHTML(el, where, html) {
	if (el.insertAdjacentHTML) {
		insertHTML = function(el, where, html) {
			return el.insertAdjacentHTML(where, html);
		};
	}
	else {
		insertHTML = function(el, where, html) {
			var elem = parseHTML(html);
			switch (where) {
				case 'beforebegin':
					el.parentNode.insertBefore(elem, el);
					break;
				case 'beforeend':
					if (el.firstChild) {
						el.insertBefore(elem, firstChild);
					}
					else {
						el.appendChild(elem);
					}
					break;
				case 'afterbegin':
					el.appendChild(elem);
					break;
				case 'afterend':
					if (el.nextSibling) {
						el.parentNode.insertBefore(elem, el.nextSibling);
					}
					else {
						el.parentNode.appendChild(elem);
					}
					break;
			}
		};
	}
	insertHTML(el, where, html);
}


global.insertHTML = insertHTML;
global.parseHTML = parseHTML;
})(this);