/**
 * FzTable表格固定
 * author: bang
 * date: 2014-11-4
 */
;(function(global, undefined) {
var FzTable,
	// 获取element
	getElem,
	hasExist,
	addEvent,
	removeEvent;

getElem = function(elem, context) {
	context = context || document;
	if (typeof elem === 'object' && elem.nodeType === 1) {
		return elem;
	}
	else if (context.querySelectorAll) {
		return context.querySelectorAll(elem);
	}
	else {
		return $(elem, context);
	}
};
hasExist = function(elem, context) {
	context = context || document.body;
	return context.contains(elem);
};
addEvent = function(elem, eventType, fn) {
	if (document.dispatchEvent) {
		elem.addEventListener(eventType, fn, false);
	}
	else {
		elem.attachEvent('on' + eventType, fn);
	}
};
removeEvent = function(elem, eventType, fn) {
	if (document.dispatchEvent) {
		elem.removeEventListener(eventType, fn);
	}
	else {
		elem.detachEvent('on' + eventType, fn);
	}
};
// FzTable
FzTable = function() {
	this.init.apply(this, arguments);
};
FzTable.prototype = {
	init: function(elem) {
		this.elem = getElem(elem)[0];
		this.fzScroll = this.elem.parentNode;
		this.fzWrap = this.fzScroll.parentNode;
		this.elem.setAttribute('data-fz-render', true);
		this.fzColumnNum = this.elem.getAttribute('data-fz-column');
		this.hasFzColumn = this.fzColumnNum > 0;
		this.makeHead();
		this.setHeadBox();

		// 有设置固定列
		if (this.hasFzColumn) {
			this.makeColumn();
			this.setColumnBox();
		}
		this.events();
	},
	// 制作head
	makeHead: function() {
		var fzHead = getElem('.fz-head', this.fzWrap)[0],
			i, j, row, cell, newRow, newCell;
		if (!fzHead) {
			fzHead = document.createElement('div');
			fzHead.className = 'fz-head';
			this.fzWrap.appendChild(fzHead);
		}
		fzHead.innerHTML = '';
		// 复制tHead
		for (i = 0; row = this.elem.tHead.rows[i]; i++) {
			newRow = document.createElement('div');
			newRow.className = 'fz-head-row';
			for (j = 0; cell = row.cells[j]; j++) {
				newCell = document.createElement('div');
				newCell.className = 'fz-head-cell';
				newCell.innerHTML = cell.innerHTML;
				newRow.appendChild(newCell);
			}
			fzHead.appendChild(newRow);
		}
		this.fzHead = fzHead;
	},
	// 制作column
	makeColumn: function() {
		var _this = this,
			fzColumn = getElem('.fz-column', this.fzWrap)[0];
		if (!fzColumn) {
			fzColumn = document.createElement('div');
			fzColumn.className = 'fz-column';
			this.fzWrap.insertBefore(fzColumn, this.fzHead);

			// 滚轮事件
			if (navigator.userAgent.indexOf('Firefox') > 0) {
				fzColumn.addEventListener('DOMMouseScroll', function(event) {
					event = event || window.event;
					if (event.detail > 0) {
						_this.fzScroll.scrollTop += 100;
					}
					else {
						_this.fzScroll.scrollTop += -100;
					}
					return false;
				}, true);
			}
			else {
				fzColumn.onmousewheel = function(event) {
					event = event || window.event;
					if (event.wheelDelta > 0) {
						_this.fzScroll.scrollTop += -100;
					}
					else {
						_this.fzScroll.scrollTop += 100;
					}
					return false;
				};
			}
		}
		fzColumn.innerHTML = '';
		fzColumn.appendChild(this.elem.cloneNode(true));
		this.fzColumn = fzColumn;
	},
	// 设置box
	setHeadBox: function() {
		var paddingLeft, i, j, row, cell;
		for (i = 0; row = this.fzHead.children[i]; i++) {
			paddingLeft = 0;
			for (j = 0; cell = row.children[j]; j++) {
				cell.style.width = this.elem.tHead.rows[i].cells[j].offsetWidth - 1 + 'px';
				if (j <= this.fzColumnNum) {
					cell.style.position = 'absolute';
					cell.style.zIndex = 2;
					cell.style.left = paddingLeft + 'px';
					paddingLeft += cell.offsetWidth;
					if (j == this.fzColumnNum) {
						cell.style.borderRightColor = '#EA9629';
					}
				}
			}
			row.style.paddingLeft = paddingLeft - 1 + 'px';
		}
		this.setHeadPos();
	},
	setColumnBox: function() {
		var columnWidth = 0,
			i;
		for (i = 0; i <= this.fzColumnNum; i++) {
			columnWidth += this.elem.tHead.rows[0].cells[i].offsetWidth;
		}
		this.fzColumn.style.width = columnWidth - 1 + 'px';
		this.fzColumn.style.height = this.fzScroll.clientHeight + 'px';
	},
	// 滚动定位
	setHeadPos: function() {
		for (var i = 0; i < this.fzHead.children.length; i++) {
			this.fzHead.children[i].style.marginLeft = -this.fzScroll.scrollLeft + 'px';
		}
		this.fzHead.style.width = this.fzScroll.clientWidth + 1 + 'px';
	},
	setColumnPos: function() {
		this.fzColumn.children[0].style.marginTop = -this.fzScroll.scrollTop - 1 + 'px';
		this.fzColumn.style.maxWidth = this.fzScroll.clientWidth + 1 + 'px';
	},
	// 设置事件
	events: function() {
		var _this = this;
		addEvent(this.fzScroll, 'scroll', function() {
			if (!hasExist(_this.elem)) {
				removeEvent(this, 'scroll', arguments.callee);
			}
			else {
				_this.setHeadPos();
				_this.setColumnPos();
			}
		});
		addEvent(window, 'resize', function() {
			if (!hasExist(_this.elem)) {
				removeEvent(window, 'resize', arguments.callee);
			}
			else {
				_this.setHeadPos();
				_this.setColumnPos();
			}
		});
	}
};
global.FzTable = FzTable;
})(this);