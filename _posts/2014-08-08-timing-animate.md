---
layout: default
title: 基于定时器实现的动画
---

随着互联网的普及，用户体验越来越重要,传统的数据内容呈现方式已经无法满足。优秀的前端设计能给用户带来视觉上冲击。

jquery的animate能适应绝大数应用场景，实现思路也并不是很复杂，利用定时器动态更改dom样式。起初在妙味课堂的视频中学到，大概是这样实现的：

```javascript
// 动画函数，由快到慢的缓动
function startMove(obj, json, fn) {
  // 初始化速度系数，值越小越快
  var s = 7;
  var stop, speed, cur, timer;
  timer = setInterval(function() {
    stop = true;
    for (var prop in json) {
      // 当前样式
      cur = parseFloat(getStyle(obj, prop)) || 0;
      speed = (json[prop] - cur) / s;
      cur += speed;
      // 临近值处理
      if (Math.abs(json - cur) < 1) {
        cur = json[prop];
      }
      // 还没到达目标值
      else {
        stop = false;
      }
      setStyle(obj, prop, cur);
    }
    // 动画结束判断
    if (stop) {
      // 关闭定时器
      clearTimeout(timer);
      // 动画结束时执行
      fn && fn.call(obj);
    }
  }, 20);
}
```

工具函数，样式获取和设置，在后面也会用到。

```javascript
// 样式获取
function getStyle(obj, prop) {
  var val;
  if (window.getComputedStyle) {
    val = getComputedStyle(obj, false)[prop];
  }
  else {
    val = obj.currentStyle[prop];
  }
  return val;
}
// 样式设置
function setStyle(obj, prop, val) {
  // 透明度属性，兼容处理
  if (prop === 'opacity') {
    obj.style.opacity = val / 100;
    obj.style.filter = 'alpha(opacity=' + val + ')';
  }
  else {
    obj.style[prop] = val + (isNaN(val) ? '' : 'px');
  }
}
```

startMove是以速度做为动画的单位，当速度无限逼近0时，就表示已达到目标值，结束动画。这样实现有不少问题，速度受限制的条件实在太多了，比如目标对象突然隐藏了，那么获取到的样式值就会有所变化，速度达不到~0，因此根本就停不下来。

而以时间作单位就不会出现这种情况，jquery、YUI等大多数库都是采用这种方案，基本实现如下：

```javascript
/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
*/
// 部分缓动公式
var Tween = {
  Quad: {
    easeIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    }
  }
};
// animate动画
function animate(opt) {
  var begin = +new Date,
      duration = opt.duration || 400,
      from = {};
  var timer, elapsed, result;
  // 起点值，参数之一
  for (var prop in opt.to) {
    from[prop] = parseFloat(getStyle(obj, prop));
  }
  timer = setInterval(function() {
    elapsed = +new Date - begin;
    for (var prop in opt.to) {
      // 缓动公式调用
      result = Tween.Quad.easeIn(elapsed, opt.from[prop], opt.to[prop] - opt.from[prop], duration);
      setStyle(obj, prop, result);
    }
    // 动画结束
    if (elapsed >= duration) {
      for (var prop in opt.to) {
        setStyle(obj, prop, opt.to[porp]);
      }
      clearInterval(timer);
      opt.onEnd && opt.onEnd.call(this);
    }
  }, 20);
}
```

总结：利用时间作单位，可控性较强，而且tween有完整的缓动公式，能够做出更加复杂的效果。

[原创]如需转载，请注明出处。

thank you, enjoy it.