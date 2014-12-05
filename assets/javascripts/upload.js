/**
 * 文件上传
 * author: bang
 * date: 2014-11-27
 */

;(function(global) {
	"use strict";

var 
	// 文件上传
	upload,
	// 请求
	http,
	// 数据格式
	dataFormat;

http = function(url, data) {
	// 创建
	var xhr = new XMLHttpRequest();
	// 监听返回
	xhr.onreadystatechange = function() {
		// console.log(this.readyState);
		switch (this.readyState) {
			// 请求未初始化
			case 0:
				break;
			// 请求已经建立
			case 1:
				break;
			// 请求已发送
			case 2:
				break;
			// 请求处理中
			case 3:
				break;
			// 响应已完成
			case 4:
				break;
		}
	};
	// 打开
	xhr.open('POST', url, true);
	// 发送
	xhr.send(data);
};
dataFormat = function(data) {
	var elems,
		formData,
		i;
	if (data) {
		if (data.nodeName) {
			formData = new FormData();
			elems = data.getElementsByTagName('input');
			for (i = 0; i < elems.length; i++) {
				formData.append(elems[i].name, 
			}
		}
	}
	return data;
};
upload = function(data) {
	data = dataFormat(data);
};
})(this);