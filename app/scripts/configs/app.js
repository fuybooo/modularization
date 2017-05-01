define(
    [
        'angular',
        'angular-async-loader',
        'require',
        'exports',
        'module'
    ],
    function (angular, asyncLoader, require, exports, module) {
        //console.info("创建angular项目启动模块app,初始化依赖项有'ui.router','ui.load','restangular','ngSanitize','ngAnimate','ngTouch','ui.bootstrap'...");
        /*var angular = require('angular');
         var asyncLoader = require('angular-async-loader');*/
        var app = angular.module('app', ['ui.router', 'ui.load', 'restangular', 'ngSanitize', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);
        //配置APP
        app.config(configure);
        app.constant('baseRequsetUrl', 'app/json/');// 使用constant注册的服务可以在config中使用，而value不可以
        //注入参数
        configure.$inject = ['$stateProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider'];
        // initialze app module for async loader
        asyncLoader.configure(app);
        //返回  app模块的引用
        module.exports = app;
        //外部引入
        function configure($stateProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
            app.registerStateProvider = $stateProvider.state;
            app.registerController = $controllerProvider.register;
            app.registerDirective = $compileProvider.directive;
            app.registerFilter = $filterProvider.register;
            app.registerFactory = $provide.factory;
            app.registerService = $provide.service;

            // Use x-www-form-urlencoded Content-Type
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '',
                    name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            //一个function数组，负责将请求的body，也就是post data，转换成想要的形式
            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function (data) {
                if (String(data) === '[object FormData]')return data;
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];
        }
    }
);
