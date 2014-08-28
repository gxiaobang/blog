/**
 * 贪吃蛇
 * author: bang
 * date: 2014-8-27
 */

// 选择器
function $selector( node ) {
	return document.querySelectorAll( node ); 
}
// 获取随机数
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}
// 风格
function createGrid( R, C, u, cvs, ctx ) {
	var i;

	ctx.save();
	ctx.strokeStyle = '#CC9999';

	ctx.beginPath();

	for( i = 0; i <= C; i++ ) {
		ctx.moveTo( i * u, 0);
		ctx.lineTo( i * u, cvs.height );
	}
	for( i = 0; i <= R; i++ ) {
		ctx.moveTo( 0, i * u );
		ctx.lineTo( cvs.width, i * u );
	}
	ctx.stroke();
	ctx.restore();
}
// 初始化
function init() {
	var cvs = $selector( '#cvs' )[0],
		ctx = cvs.getContext( '2d' ),
		score = $selector( '#score' )[0],
		// 设置单位大小
		u = 20,
		R = Math.ceil( cvs.height / u ),
		C = Math.ceil( cvs.width / u),
		// 获取snake开始随机位置
		x = Math.ceil( random( 5, C - 5 ) ),
		y = Math.ceil( random( 5, R - 5 ) ),
		snake;

	snake = new Snake( { R: R, C: C, x: x, y: y, u: u, ctx: ctx, score: score } );
	update( cvs, ctx, [function() { snake.draw() }, function() { createGrid( R, C, u, cvs, ctx ) }]);
	
	$selector('#btn_start')[0].onclick = function() {
		snake.start();
	};
}
// 刷新canvas
function update( cvs, ctx, callbacks ) {
	ctx.clearRect( 0, 0, cvs.width, cvs.height );

	var i = 0;
	while( i < callbacks.length ) {
		callbacks[i]();
		i++;
	}

	setTimeout( function() { update( cvs, ctx, callbacks ) }, 1000 / 60 );
}

// Snake
function Snake() {
	this.init.apply( this, arguments );
}
Snake.prototype = {
	init: function( options ) {
		this.options = options;
		// 移动设置
		this.beginTime = +new Date;
		this.speed = 100;
		// 游戏开始默认值
		this.isOver = false;
		this.score = 0;

		this.create();
		this.listen();
	},
	// 游戏开始
	start: function() {
		this.isStart = true;
	},
	// 创建Snake
	create: function() {
		this.nodes = [];

		this.nodes.push( { c: this.options.x, r: this.options.y, dir: 'right' });
		for( var i = 1; i <= 4; i++ ) {
			this.nodes.push( { c: this.nodes[i-1].c - 1, r: this.nodes[0].r } )
		}

		this.food = new Food( this.options.R, this.options.C, this.options.u, this );
	},
	listen: function() {
		var _this=this;
		document.onkeydown = function( event ) {
			event = event || window.event;

			switch( event.keyCode ) {
				case 37:
				_this.nodes[0].dir = 'left';
				break;
				case 38:
				_this.nodes[0].dir = 'up';
				break;
				case 39:
				_this.nodes[0].dir = 'right';
				break;
				case 40:
				_this.nodes[0].dir = 'down';
				break;
			}
		};
	},
	// 蛇身跟随
	follow: function() {
		for( var i = this.nodes.length - 1; i > 0; i-- ) {
			this.nodes[i].r = this.nodes[i - 1].r;
			this.nodes[i].c = this.nodes[i - 1].c;
		}
	},
	// 蛇头方向移动
	move: function() {
		this.elaspsedTime = +new Date - this.beginTime;

		if( this.elaspsedTime > this.speed ) {
			this.beginTime = +new Date;

			this.follow();
			switch( this.nodes[0].dir ) {
				case 'left':
				this.nodes[0].c--;
				break;
				case 'up':
				this.nodes[0].r--;
				break;
				case 'right':
				this.nodes[0].c++;
				break;
				case 'down':
				this.nodes[0].r++;
				break;
			}

			// 循环屏幕
			if( this.nodes[0].c < 0 ) {
				this.nodes[0].c = this.options.C - 1;
			}
			else if( this.nodes[0].c > this.options.C - 1 ) {
				this.nodes[0].c = 0;
			}

			if( this.nodes[0].r < 0 ) {
				this.nodes[0].r = this.options.R - 1;
			}
			else if( this.nodes[0].r > this.options.R - 1 ) {
				this.nodes[0].r = 0;
			}

			if( this.testOver() ) {
				this.isOver = true;
				alert( 'Game is over. Thank you for playing.' );
			}
			else if( this.testEat() ) {
				this.eat();
			}
		}	
	},
	setScore: function() {
		this.score += 100;
		this.options.score.innerHTML = ' ' + this.score + ' ';
	},
	// 游戏规则
	rule: function() {
		var coef = Math.floor( this.score / 1000 );
		this.food.create( 2 + coef );
		this.speed = 100 - coef * 20;
	},
	eat: function() {
		this.remove( this.food.nodes, this.eatup );
		this.nodes.push( {} );
		this.setScore();

		if( !this.food.nodes.length ) {
			this.rule();
		}
	},
	remove: function( arr, item ) {
		var index = arr.indexOf( item );

		if( ~index ) {
			arr.splice( index, 1 );
		}

		return index;
	},
	testEat: function() {
		for( var i = 0, food; food = this.food.nodes[i]; i++ ) {
			if( food.r == this.nodes[0].r && food.c == this.nodes[0].c ) {
				this.eatup = food;				
				return true;
			}
		}
		return false;
	},
	testOver: function(){
		for( var i = 1; i < this.nodes.length; i++ ) {
			if( this.nodes[0].r == this.nodes[i].r && this.nodes[0].c == this.nodes[i].c ) {
				return true;
			}
		}

		return false;
	},
	drawRect: function( c, r ) {
		var ctx = this.options.ctx,
			u = this.options.u;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = '#99CCCC';
		ctx.rect( c * u, r * u, u, u );
		ctx.fill();
		ctx.restore();
	},
	draw: function() {
		if( !this.isStart ) return;
		
		if( !this.isOver ) {
			// snake 移动
			this.move();
		}	

		var i;
		for( i = 0; i < this.nodes.length; i++ ) {
			this.drawRect( this.nodes[i].c, this.nodes[i].r, this.options.u );
		}

		this.food.draw( this.options.ctx );
	}
}
function Food() {
	this.init.apply( this, arguments );
}
Food.prototype = {
	init: function( R, C, u, snake ) {
		this.R = R;
		this.C = C;
		this.u = u;
		this.snake = snake;
		this.create(2);
	},
	draw: function( ctx ) {
		for( var i = 0; i < this.nodes.length; i++ ) {
			this.drawFood( this.nodes[i].c, this.nodes[i].r, this.u, ctx );
		}
	},
	drawFood: function( c, r, u, ctx ) {
		ctx.save();
		ctx.fillStyle = '#9999CC';
		ctx.beginPath();
		ctx.rect( c * u, r * u, u, u);
		ctx.fill();
		ctx.restore();
	},
	create: function( num ) {
		this.nodes = [];
		
		for( var i = 0; i < num; i++ ) {
			this.nodes.push( this.createRandom() );
		}

		// console.log( this.nodes );
	},
	// 随机创建
	createRandom: function() {
		var c, r, i;

		while( true ) {
			c = random( 0, this.C - 1 ) | 0;
			r = random( 0, this.R - 1 ) | 0;

			for( i = 0; i < this.nodes.length; i++ ) {
				if( this.nodes[i].c == c && this.nodes[i].r == r) continue;
			}
			for( i = 0; i < this.snake.nodes.length; i++ ) {
				if( this.snake.nodes[i].c == c && this.snake.nodes[i].r == r) continue;
			}

			return { c: c, r: r };
		}
	}
}

window.onload = init;