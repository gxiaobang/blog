---
layout: default
title: 新版本express
---

今天更新了一下express版本，更新完成后输入命令express不能用了。从网上查找了资料才知道，原来express4.x，需要再安装个express-generator工具。

# 安装express-generator

```bash
$npm install -g express
$npm install -g express-generator
```
<pre class="language-bash">
	<code class="language-bash">
	$npm install -g express
	$npm install -g express-generator
	</code>
</pre>
<p>
	启动发生了变化。
</p>
<pre class="language-bash">
	<code class="language-bash">
	$express -e [name]	创建express项目
	$cd [name] && npm install	打开项目，并安装依赖包
	$node app.js 	旧的启动方式
	$npm start 	新的启动方式
	</code>
</pre>
<p>
	默认端口还是3000，打开浏览器输入localhost:3000。
</p>