/**
 * author: bang
 * date: 2014-9-25
 */

;(function(global) {

var FPS = 60,
    DOC = document,
    WIN = DOC.defaultView;

// 检测数据类型
function typeOf(obj) {
    var type = Object.prototype.toString.call(obj);
    return type.substring(8, type.length - 10);
}
// 获取样式
function getStyle(node, attr) {
    var opacity;
    // W3C标准
    if (WIN && WIN.getComputedStyle) {
        return WIN.getComputedStyle(node, '')[attr] || null;
    }
    // IE8-
    else {
        if (attr === 'opacity') {
            opacity = ((obj.filters.alpha || obj.filters['DXImageTransform.Microsoft.Alpha']).opacity || 100) /100
        }
        else {
            opacity = node.currentStyle['opacity'] || null;
        }
        return opacity;
    }
}
// 设置样式
function setStyle(node, attr, value) {
    var attrs = {},
        name;

    if (arguments.length === 3 && typeOf(attr) === 'String') {
        attrs[attr] = value;
    }
    else {
        attrs = attr;
    }

    for (name in attrs) {
        if (name === 'opacity') {
            node.style.opacity = attrs[name];
            node.style.filter = 'alpha(opacity=' + (attrs[name] * 100) + ')';
        }
        else if (isNaN(attrs[name])) {
        	node.style[name] = attrs[name];
        }
        else {
        	node.style[name] = attr[name] + 'px';
        }
    }
}

function haha(a) {
    switch (a) {
        case 'haha':
            console.log('haha');
            break;
        case 'bbb':
            console.log('bbb');
            break;
    }
}

global.Animate = Animate;

})(this);