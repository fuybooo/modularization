define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    var titleSuffix = '-Fuybooo的博客网站';
    
    
    //用于初始化全局的数据，仅对全局作用域起作用
    app.run(function ($state, $stateParams, $rootScope, $anchorScroll) {
        $rootScope.titleNameMap = {
            'home': '首页',
            'home.land': '首页',
            'home.landing': '首页',
            'login': '登录',
            'register': '注册',
            'serviceItem': '服务条款',
            'home.useBootstrapTable': '使用bootstrap-table',
            'home.userBootstrapModal': '使用bootstrap-modal',
            'home.usePopupwin': '使用popupwin',
            'home.useEcharts': '使用echarts',
            'home.admin': '管理系统',
            'home.admin.index': '管理系统-首页',
            'home.admin.user': '管理系统-人员管理',
            'home.admin.viewResults': '管理系统-查询成绩',
            'home.commonFunction': '通用方法',
            'home.developmentNorm': '开发手册-开发规范',
            'home.scroll': '滚动效果',
            'home.codingRule': '代码规范',
            'home.test': '测试',
            'home.dataTimePicker': '日期选择控件'
        };
        $anchorScroll.yOffset = 70;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        $rootScope.back = function () {
            $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        };
        $rootScope.$on('$stateChangeStart', function (evt, next, current) {
            $(window).off('scroll.fuybooo');
            // 确定当前页面的标题
            $rootScope.pageTitle = $rootScope.titleNameMap[next.name] + titleSuffix;
            // 当前页面的样式
            if(next.name.indexOf('.admin') !== -1){
                $rootScope.admin = {
                    addUser: true
                };
            }else{
                $rootScope.admin = {
                    addUser: false
                };
            }
            
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
                    'scripts/login/register-controller',
                    'scripts/login/user-info-controller'
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
                templateUrl: 'app/views/example/use-echarts.html',
                controller: 'UseEchartsController',
                dependencies: [
                    'scripts/example/use-echarts-controller'
                ]
            })
            .state('home.admin', {
                abstract: true,
                url: '/admin',
                templateUrl: 'app/views/admin/admin.html',
                dependencies: [
                    'scripts/admin/admin-directive',
                    'scripts/admin/admin-menu-controller'
                ]
            })
            .state('home.admin.index', {
                url: '/index',
                templateUrl: 'app/views/admin/admin-index.html',
                controller: 'AdminIndexController',
                dependencies: [
                    'scripts/admin/admin-index-controller'
                ]
            })
            .state('home.admin.user', {
                url: '/user',
                templateUrl: 'app/views/admin/admin-user.html',
                controller: 'AdminUserController',
                dependencies: [
                    'scripts/admin/admin-user-controller'
                ]
            })
            .state('home.admin.viewResults', {
                url: '/view-results',
                templateUrl: 'app/views/admin/admin-view-results.html',
                controller: 'AdminViewResultsController',
                dependencies: [
                    'scripts/admin/admin-view-results-controller'
                ]
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
            .state('home.developmentManual', { // 使用abstract时，访问路径不能直接写abstract的访问路径，而应该写其子页面
                abstract: true,
                url: '/developmentManual',
                templateUrl: 'app/views/development-manual/development-manual.html',
                controller: 'DevelopmentController',
                dependencies: [
                    'scripts/development-manual/development-directive',
                    'scripts/development-manual/development-controller'
                ]
            })
            .state('home.developmentManual.norm', {
                url: '/norm',
                templateUrl: 'app/views/development-manual/development-norm.html'
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
            .state('home.baiduMapSpecial', {
                url: '/test/baiduMapSpecial',
                templateUrl: 'app/views/test/baidu-map-special.html',
                controller: 'BaiduMapSpecialController',
                dependencies: [
                    'scripts/test/baidu-map-special-controller',
                    'scripts/test/baidu-map-special-directive'
                ]
            })
        ;
        $urlRouterProvider.otherwise('');
    }]);
});
