define(function (require) {
    var app = require('app');
    var angular = require('angular');
    app.factory('dataService', function ($http, baseRequestUrl) {
        var service = {};
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
            promise = service.returnPromise(method, url, param);
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
         * 暴露在外的方法
         */
        service.returnPromise = function (type, url, data) {
            var options = {
                url: baseRequestUrl + url
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
         * 获取人员信息
         * @param params
         * @param callback
         */
        service.getUsers = function (params, callback) {
            get('user.json', params, callback);
        };
        return service;
    });
});