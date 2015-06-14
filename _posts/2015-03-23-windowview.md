---
layout: default
title: window视图大小
---

window获取视图宽高，不同的浏览器需要用到不同的获取方式。

```javascript
// 高版本浏览器
window.innerWidth
window.innnerHeight
// chrome
document.body.clientWidth
document.body.clientHeight
// IE firefox
document.documentElement.clientWidth
document.documentElement.clientHeight
```

用一个函数包装获取和设置

```javascript
// 获取
function getView() {
  return {
    width: window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
  };
}
var view = getView();
view.width  // 获取宽
view.height  // 获取高
```

window.innerWidth和innerHeight是标准，而且在移动端通过此属性获取到的值是最准确的。如何做到在通过window.innerWidth做到兼容不同种类的浏览器？答案是用getter，如下所示：

```javascript
// innerWidth
if (typeof window.innerWidth !== 'number') {
  Object.defineProperty(window, 'innerWidth', {
    get: function() {
      return document.body.clientWidth || document.documentElement.clientWidth;
    }
  })
}
// innerHeight
if (typeof window.innerHeight !== 'number') {
  Object.defineProperty(window, 'innerHeight', {
    get: function() {
      return document.body.clientHeight || document.documentElement.clientHeight;
    }
  })
}


window.innerWidth // view宽
window.innerHeight // view高
```

现在在不同的浏览器可以大胆的使用window.innerWidth和window.innerHeight。