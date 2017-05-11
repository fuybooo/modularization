define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    //用于初始化全局的数据，仅对全局作用域起作用
    app.run(function ($state, $stateParams, $rootScope, $anchorScroll) {
        $anchorScroll.yOffset = 70;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        /*返回上一页：（当前定的打开新窗口问题太多，比如详情页面什么时机关闭，等等。。。 单页应用SPA，除非必要不应该去打开太多窗口。）
         * 参数传递：1.rootScope变量，2事件机制。
         * */
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // to be used for back button //won't work when page is reloaded.
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        //back button function called from back button's ng-click='back()'
        $rootScope.back = function () {//实现返回的函数
            $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        };
        $rootScope.$on('$stateChangeStart', function (evt, next, current) {
            $rootScope.pageTitle = next.name;
        });
        $rootScope.$on('$locationChangeStart', function(){
        });
    });
    //配置信息
    app.config(['RestangularProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$logProvider', function (RestangularProvider, $stateProvider, $urlRouterProvider, $httpProvider, $logProvider) {
        //关闭	$log.debug();
        $logProvider.debugEnabled(false);

        // $httpProvider.interceptors.push('myInterceptor');
        //配置路由
        $stateProvider
            .state('home', {
                abstract: true,
                url: '',
                templateUrl: 'app/views/home.html',
                // support to load more controllers, services, filters, ...
                dependencies: [
                    'scripts/home/home-directive', // 提供了home-nav的指令
                    'scripts/home/home-controller',
                    'scripts/login/login-directive',
                    'scripts/login/login-controller',
                    'scripts/login/register-directive',
                    'scripts/login/register-controller'
                ]
            })
            // 当home为abstract时,url需要和home的url保持一致,才能正常显示
            .state('home.land', {
                url: '',
                templateUrl: 'app/views/landing.html',
                controller: 'LandingController',
                dependencies: [
                    'scripts/home/landing-controller'
                ]
            })
            // 点击首页时跳转
            .state('home.landing', {
                url: '/home',
                templateUrl: 'app/views/landing.html',
                controller: 'LandingController',
                dependencies: [
                    'scripts/home/landing-controller'
                ]
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/login.html',
                controller: 'LoginController',
                // support to load more controllers, services, filters, ...
                dependencies: [
                    'scripts/login/login-controller',
                    'scripts/login/login-directive'
                ]
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/views/register.html',
                controller: 'RegisterController',
                // support to load more controllers, services, filters, ...
                dependencies: [
                    'scripts/login/register-controller',
                    'scripts/login/register-directive'
                ]
            })
            .state('serviceItem', {
                url: '/serviceItem',
                templateUrl: 'app/views/service-item.html'
            })
            .state('home.useBootstrapTable', {
                url: '/example/use-bootstrap-table',
                templateUrl: 'app/views/example/use-bootstrap-table.html',
                controller: 'UseBootstrapTableController',
                dependencies: [
                    'scripts/example/use-bootstrap-table-controller',
                    'scripts/example/use-bootstrap-table-directive'
                ]
            })
            .state('home.userBootstrapModal', {
                url: '/example/use-bootstrap-modal',
                templateUrl: 'app/views/example/use-bootstrap-modal.html'
            })
            .state('home.usePopupwin', {
                url: '/example/use-popupwin',
                templateUrl: 'app/views/example/use-popupwin.html',
                controller: 'UsePopupwinController',
                dependencies: [
                    'scripts/example/use-popupwin-controller'
                ]
            })
            .state('home.useEcharts', {
                url: '/example/use-echarts',
                templateUrl: 'app/views/example/use-echarts.html'
            })
            .state('home.managementSystem', {
                url: '/managementSystem',
                templateUrl: 'app/views/managementSystem.html'
            })
            .state('home.commonFunction', {
                url: '/commonFunction',
                templateUrl: 'app/views/commonFunction.html'
            })
            .state('home.scroll', {
                url: '/commonFunction/scroll',
                templateUrl: 'app/views/common-function/scroll.html',
                controller: 'ScrollController',
                dependencies: [
                    'scripts/common-function/scroll-controller'
                ]
            })
            .state('home.codingRule', {
                url: '/codingRule',
                templateUrl: 'app/views/codingRule.html'
            })
            .state('home.test', {
                url: '/test',
                templateUrl: 'app/views/test.html'
            })
            .state('home.dataTimePicker', {
                url: '/test/dataTimePicker',
                templateUrl: 'app/views/test/data-time-picker.html',
                controller: 'DataTimePickerController',
                dependencies: [
                    'scripts/test/data-time-picker-controller'
                ]
            })
        ;
        $urlRouterProvider.otherwise('');
    }]);
});
