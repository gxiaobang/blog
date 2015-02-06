/**
 * Tw工具
 * author: bang
 * version: '1.0'
 * date: 2014-09-12
 */
;(function( global ) {
var Tw = {
		versions: '1.0'
	},
	DOC = document,
    WIN = DOC.defaultView,
	// 支持
	supports = {
		'@w3c': DOC.dispatchEvent

	},
	// event
	addEvent, removeEvent,
	range,
	// dom ready
	domReady;

// 数据类型
function typeOf( obj ) {
    var type = Object.prototype.toString.call( obj );

    return type.substring( 8, type.length - 1 );
}

// range
function createRange() {
	range = DOC.createRange();
	range.selectNodeContents( DOC.body.firstChild || DOC.body );
}
// 初始化设置
function render() {
	createRange();
}

// 事件绑定、解绑
(function() {
	var add = supports['@w3c'] ? 
		function( elem, type, handle ) {
			elem.addEventListener( type, handle, false );
		} :
		function( elem, type, handle ) {
			elem.detachEvent( 'on' + type, handle );
		},
		remove = supports['@w3c'] ? 
		function( elem, type, handle ) {
			elem.removeEventListener( type, handle );
		} :
		function( elem, type, handle ) {
			elem.detachEvent( 'on' + type, handle );
		};

	addEvent = function( elem, type, handle ) {

	}
})();

domReady = (function( fn ) {
	var fns = [],
		loaded = false;
	function completed() {
		if( !loaded && supports['@w3c'] || DOC.readyState === 'complete' ) {
			for( var i = 0; i < fns.length; i++ ) {
				fns[i]();
			}
			loaded = true;
		}
	}
	// 标准
	if( supports['@w3c'] ) {
		DOC.addEventListener( 'DOMContentLoaded', completed, false);
		DOC.addEventListener( 'load', completed, false );
	}
	else {
		DOC.detachEvent( 'onreadystatechange', completed );
		DOC.detachEvent( 'onload', completed );
	}

	return function( fn ) {
		// 加载完毕
		if( loaded ) {
			fn();
		}
		else {
			fns.push( fn );
		}
	};
})();

// 添加dom
function insertHTML( el, where, html ) {
	if( !el ) return false;

	// ie
	if( el.insertAdjacentHTML ) {
		el.insertAdjacentHTML( where, html );
	}
	else {
		var frag = parseHTML( html );
		switch( where ) {
			// 开始标签前面
			case 'beforebegin':
				el.parentNode.insertBefore( frag, el.firstChild );
				break;
			// 开始标签后面
			case 'afterbegin':
				if( el.firstChild ) {
					el.insertBefore( frag, el.firstChild );
				}
				else {
					el.appendChild( frag );
				}
				break;
			// 结束标签前面
			case 'beforeend':
				el.appendChild( frag );
				break;
			case 'afterend':
				if( el.nextSibling ) {
					el.parentNode.insertBefore( frag, el.nextSibling );
				}
				else {
					el.parentNode.appendChild( frag );
				}
			break;
		}
	}
}
// 将字符串转成element
function parseHTML( html ) {
	return range.createContextualFragment( html );
}

// 获取垂直位置
function getTop( elem ) {
	var top = 0,
		node = elem;

	while( node ) {
		top += node.offsetTop;
		node = node.offsetParent;
	}
	return top;
}
// 获取水平位置
function getLeft( elem ) {
	var left = 0,
		node = elem;

	while( node ) {
		left += node.offsetLeft;
		node = node.offsetParent;
	}
	return left;
}
// getBoundingClientRect
function getClientRect( elem ) {
	if( elem.getBoundingClientRect ) {
		return elem.getBoundingClientRect();
	}
	else {
		var rect = { top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 };

		rect.width = elem.offsetWidth;
		rect.height = elem.offsetHeight;
		rect.top = getTop( elem );
		rect.left = getLeft( elem );
		rect.right = rect.width + rect.left;
		rect.bottom = rect.height + rect.top;

		return rect;
	}
}

// 设置时间
function dateFormat( format, date ) {
	date = date || new Date;
	return String(format).replace(/yyyy|MM|dd|hh|HH|mm|ss/g, function( match ) {
		// console.log( arguments );
		switch( match ) {
			case 'yyyy':
				return date.getFullYear();
			case 'MM':
				return date.getMonth() + 1;
			case 'dd':
				return date.getDate();
			case 'hh':
				var hours24 = date.getHours();
				return hours24 < 12 ? hours24 : hours24 - 12;
			case 'HH':
				return date.getHours();
			case 'mm':
				return date.getMinutes();
			case 'ss':
				return date.getSeconds();
		}
	});
}

var FPS = 60;
// 数据类型
function typeOf( obj ) {
    var type = Object.prototype.toString.call( obj );

    return type.substring( 8, type.length - 1 );
}

// 获取样式
function getStyle( node, attr ) {
    // W3C标准
    if( WIN && WIN.getComputedStyle ) {
        return WIN.getComputedStyle( node, '' )[ attr ] || null;
    }
    // IE8-
    else {
        if( attr === 'opacity' ) {
            var filters = obj.filters.alpha ||
                            obj.filters[ 'DXImageTransform.Microsoft.Alpha' ];

            return ( filters.opacity || 100 ) / 100;
        }
        else {
            return node.currentStyle[ attr ] || null;
        }
    }
}
// 设置样式
function setStyle( node, attr, value ) {
    var attrs = {},
        name;

    if( arguments.length === 3 && typeOf( attr ) === 'String' ) {
        attrs[ attr ] = value;
    }
    else {
        attrs = attr;
    }

    for( name in attrs ) {
        if( name === 'opacity' ) {
            node.style.opacity = attrs[ name ];
            node.style.filter = 'alpha(filter=' + (attrs[ name ] / 100) + ')';
        }
        else if( isNaN( attrs[ name ] ) ) {
            node.style[ name ] = attrs[ name ];
        }
        else {
            node.style[ name ] = attrs[ name ] + 'px';
        }
    }
}

// 创建Fx
function Fx() {
    this._init.apply( this, arguments );
}
Fx.prototype = {
    _init: function( node ) {
        this.node = node;
    },
    // 设置运动参数
    animOptions: function( options ) {
        this.options = options;

        return this;
    },
    // 开始
    start: function() {
        
        if( !this.isAnim ) {
            this.isAnim = true;
            this.intend();
            this.move();
        }
    },
    // 获取初始化参数
    intend: function() {
        this.options.from = this.options.from || {};
        for( var name in this.options.to ) {
            this.options.to[ name ] = parseFloat( this.options.to[ name ] );
            if( !this.options.from[ name ] ) {
                this.options.from[ name ] = parseFloat( getStyle( this.node, name ) );
            }
            else {
                this.options.from[ name ] = parseFloat( this.options.from[ name ] );
            }
        }

        // 缓动函数
        this.options.type = this.options.type || 'Quart';
        this.options.ease = this.options.ease || 'easeOut';
        if( this.options.type === 'Linear' ) {
            this.options.fTween = Tween.Linear;
        }
        else {
            this.options.fTween = Tween[ this.options.type ][ this.options.ease ];
        }
    },
    // 补间动画
    move: function() {
        var _this = this,
            // 运动所需要的参数
            fTween = this.options.fTween,
            duration = this.options.duration || 400,
            from = this.options.from,
            to = this.options.to,
            startTime = +new Date,
            reverse = this.options.reverse = {},
            anim, elespedTime, calc, name;

        anim = function() {
            elespedTime = +new Date - startTime;

            if( _this.isAnim ) {
                for( name in to ) {
                    calc = fTween( elespedTime, from[ name ], to[ name ] - from[ name ], duration );
                    setStyle( _this.node, name, calc );
                    
                    if( !reverse[ name ] ) reverse[ name ] = [];
                    reverse[ name ].push( calc );
                }
                
                if( elespedTime < duration ) {
                    global.requestAnimFrame( anim );
                }
                else {
                    if( _this.options.isReverse ) {
                        _this.makeReverse();
                    }
                    else {
                        _this.complete( _this.options.to );
                    }
                }
            }
        };

        global.requestAnimFrame( anim );
    },
    // 停止
    stop: function() {
        this.isAnim = false;
    },
    // 运动完成
    complete: function( attrs ) {
        this.stop();
        setStyle( this.node, attrs );
        this.options.onComplete && this.options.onComplete.call( this );
    },
    // 回放
    makeReverse: function() {
        var _this = this,
            keys = Object.keys( this.options.from ),
            n = this.options.reverse[ keys[0] ].length,
            name;

        function callback_reverse() {
            if( _this.isAnim ) {
                if( --n > -1 ) {
                    for( name in _this.options.from ) {
                        setStyle( _this.node, name, _this.options.reverse[ name ][n] );
                    }

                    global.requestAnimFrame( callback_reverse );
                }
                else {
                    _this.complete( _this.options.from );
                }
            }
        }

        global.requestAnimFrame( callback_reverse );
    },
    // 运行
    run: function() {
        this.start();
    }
};

// 加载
domReady(function() {
	render();
});

Tw.insertHTML = insertHTML;
Tw.parseHTML = parseHTML;
Tw.dateFormat = dateFormat;
Tw.getClientRect = getClientRect;
Tw.ready = domReady;
Tw.typeOf = typeOf;
Tw.supports = supports;
Tw.addEvent = addEvent;
Tw.removeEvent = removeEvent;
Tw.getStyle = getStyle;
Tw.setStyle = setStyle;
Tw.Fx = Fx;
global.Tw = Tw;

})(this);
