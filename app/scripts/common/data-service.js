define(function (require) {
    var app = require('app');
    var angular = require('angular');
    app.factory('dataService', function ($http, baseRequestUrl, baseStaticUrl, webSocketUrl) {
        var service = {};
        /**
         * 请求资源
         */
        var request = function () {
            var url, param, cb_s, cb_e, promise;
            var method = arguments[0];
            angular.forEach(arguments[1], function (value) {
                if (typeof value === 'string') {
                    url = value;
                } else if (typeof value === 'object') {
                    param = value;
                } else if (typeof value === 'function') {
                    if (cb_s) {
                        cb_e = value;
                    } else {
                        cb_s = value;
                    }
                }
            });
            
            promise = service.getPromise(method, url, param);
            if (cb_e) {
                promise.success(cb_s).error(cb_e);
            } else {
                promise.success(cb_s);
            }
        }
        var get = function () {
            request('GET', arguments);
        };
        var post = function () {
            request('POST', arguments);
        };
        
        
        /**
         * 请求返回promise对象
         * 如果只传一个url作为参数，则请求静态资源，目前只限制.html和.json两种格式
         * @param type
         * @param url
         * @param data
         * @returns {*}
         */
        service.getPromise = function (type, url, data) {
            // url以.html或者.json结尾，则请求静态资源
            // 否则请求服务器资源
            if (arguments.length === 1) {
                type = 'GET';
                url = arguments[0];
            }
            var requestType = url.slice(-5);
            if (requestType === '.html') {
                url = baseStaticUrl + 'views/';
            } else if (requestType === '.json') {
                url = baseStaticUrl + 'json/';
            } else {
                url = baseRequestUrl + url;
            }
            var options = {
                url: url
            }
            if (type === 'GET') {
                options.method = 'GET';
                if (data) {
                    options.params = data;
                }
            } else {
                options.method = 'POST';
                if (data) {
                    options.data = data;
                }
            }
            return $http(options);
        };
        /**
         * 建立webSocket
         */
        service.createWebSocket = function (address) {
            return new WebSocket(webSocketUrl + (address || ''));
        };
        /**
         * 获取人员信息
         * @param params
         * @param callback
         */
        service.getUsers = function (params, callback) {
            get('user', params, callback);
        };
        /**
         * 登录
         */
        service.doLogin = function (params, callback) {
            post('login', params, callback);
        };
        
        return service;
    });
});