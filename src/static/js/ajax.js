import axios from 'axios';
import $ from 'jquery';
export var my_url = '';
export var crm_url = 'https://';
var request;
export function getData(type, url, callback, params) {
	var params = params || {};

	 $.ajax({
		type: type,
		async: true,
		url: url,
		data: params,
		headers: {
			// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			// 'Access-Control-Allow-Credentials':true,
			// 'Access-Control-Allow-Headers': 'x-requested-with,Origin, Content-Type, Cookie, Accept',
			// 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS',
			// 'OPTIONSAccess-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Origin': '*'
		},
		//dataType : "jsonp",
		//jsonp: "jsonpCallback",
		// dataType: 'jsonp',  // 请求方式为jsonp
		// crossDomain: true,
		success: function (data) {
			var obj = JSON.parse(data);
			callback(obj);
		}
	});
};
export function getDataOne(type, url, callback, params) {
	var params = params || {};
	if (request) {
		request.abort();
	}
	request = $.ajax({
		type: type,
		async: true,
		url: url,
		data: params,
		headers: {
			// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			// 'Access-Control-Allow-Credentials':true,
			// 'Access-Control-Allow-Headers': 'x-requested-with,Origin, Content-Type, Cookie, Accept',
			// 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS',
			// 'OPTIONSAccess-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Origin': '*'
		},
		//dataType : "jsonp",
		//jsonp: "jsonpCallback",
		// dataType: 'jsonp',  // 请求方式为jsonp
		// crossDomain: true,
		success: function (data) {
			var obj = JSON.parse(data);
			callback(obj);
		}
	});
};
export function getPhoneData(type, url, callback, params) {
	$.ajax({
		type: type,
		async: true,
		url: url,
		data: params,
		// headers: {
		// 	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		// 	'Access-Control-Allow-Credentials':true,
		// 	'Access-Control-Allow-Headers': 'x-requested-with,Origin, Content-Type, Cookie, Accept',
		// 	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS',
		// 	'OPTIONSAccess-Control-Allow-Origin': '*',
		// 	'Access-Control-Allow-Origin': '*'
		// },
		//dataType : "jsonp",
		//jsonp: "jsonpCallback",
		success: function (data) {
			//var obj = JSON.parse(data);
			callback(data);
		}
	});
};