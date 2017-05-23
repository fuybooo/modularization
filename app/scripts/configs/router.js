define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    var titleSuffix = 'Fuybooo的博客网站';


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
            'home.admin.viewResults': '管理系统-成绩管理-查询成绩',
            'home.admin.topic': '管理系统-文章管理',
            'home.admin.topicDetail': '管理系统-文章管理',
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
        /**
         * 实现自定义返回按钮：ng-click="back()"，此方法在刷新页面后再次返回就会报错
         */
        // $rootScope.back = function () {
        //     $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        // };
        /**
         * 一般情况可以满足后退需求，但是，如果在需要后退的页面中有改变浏览器地址栏状态的操作则此方法不可用
         */
        // $rootScope.back = function(){
        //     window.history.back();
        // };
        $rootScope.$on('$stateChangeStart', function (evt, next, current) {
            $(window).off('scroll.fuybooo');
            // 确定当前页面的标题
            var title;
            $rootScope.pageTitle = ((title = $rootScope.titleNameMap[next.name]) ? (title + '-') : '') + titleSuffix;
            // 当前页面的样式
            if (next.name.indexOf('.admin') !== -1) {
                $rootScope.isAdmin = true;
            } else {
                $rootScope.isAdmin = false;
            }
            if (next.name.indexOf('.fuyboooMall') !== -1) {
                $rootScope.isFuyboooMall = true;
            } else {
                $rootScope.isFuyboooMall = false;
            }
            if (next.name.indexOf('.land') !== -1) {
                $rootScope.isLanding = true;
            } else {
                $rootScope.isLanding = false;
            }

        });
        $rootScope.$on('$locationChangeStart', function () {
        });
        $rootScope.isRelativePage = function(sref, state){
            if(sref && state){
                if(sref.match(/\./g).length > 1) {
                    var _sref = sref.split('.')[0] + sref.split('.')[1];
                    var _state = state.split('.')[0] + state.split('.')[1];
                    if(_sref === _state){
                        return true;
                    }
                }
            }
            return false;
        };
        $rootScope.$on('$viewContentLoaded', function () {
            var $navLi = $('.js-app-header').find('.navbar-nav li');
            var $navA = $navLi.find('a');
            // 刷新页面时保持选中状态
            var state = $state.current.name === 'home.land' ? 'home.landing' : $state.current.name;
            $navLi.removeClass('active');
            $navA.each(function () {
                // 导航sref与当前状态相同，或者同属于一个父状态，则激活之
                var sref = $(this).attr('ui-sref');
                if (sref === state || $rootScope.isRelativePage(sref, state)) {
                    // 激活顶部导航栏
                    $(this).parent().addClass('active');
                    var dropDown = $(this).parent().parent().parent();
                    if (dropDown.hasClass('dropdown')) {
                        dropDown.addClass('active');
                    }
                    // 在页面到达管理系统时，对右侧菜单进行处理
                    if(state === 'home.admin.index'){
                        $('.admin-menu').find('li').removeClass('active').each(function () {
                            if ($(this).attr('ui-sref') === $state.current.name) {
                                $(this).addClass('active');
                            }
                        });
                    }
                }
            });
            $navA.off('click.hn').on('click.hn', function () {
                var target = $(this).parent();
                if (!target.hasClass('dropdown-toggle')) { // 点击的是下拉菜单时,不做任何事情,否则
                    // 清除所有的active
                    $navLi.removeClass('active');
                    // 改变导航栏样式
                    if ($(this).parent().parent().hasClass('dropdown-menu')) {
                        target = $(this).parent().parent().parent();
                        $(this).parent().addClass('active');
                    }
                    target.addClass('active');
                }
            });
        });

    });
    //配置信息
    app.config(['RestangularProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$logProvider', function (RestangularProvider, $stateProvider, $urlRouterProvider, $httpProvider, $logProvider) {
        //关闭	$log.debug();
        $logProvider.debugEnabled(false);

        $httpProvider.interceptors.push('httpInterceptor');
        //配置路由
        $stateProvider
            .state('home', {
                abstract: true,
                url: '',
                templateUrl: 'app/views/home.html',
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
            // // 当home为abstract时,url需要和home的url保持一致,才能正常显示
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
            .state('home.admin.topic', {
                url: '/topic',
                templateUrl: 'app/views/admin/admin-topic.html',
                controller: 'AdminTopicController',
                dependencies: [
                    'scripts/admin/admin-topic-controller'
                ]
            })
            .state('home.admin.topicDetail', {
                url: '/topic-detail?flag',
                params: {flag: ''},
                templateUrl: 'app/views/admin/admin-topic-detail.html',
                controller: 'AdminTopicDetailController',
                dependencies: [
                    'scripts/admin/admin-topic-detail-controller'
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
            .state('home.gradientSpecial', {
                url: '/test/gradientSpecial',
                templateUrl: 'app/views/test/gradient-special.html'
            })
            .state('home.fuyboooMall', {
                abstract: true,
                url: '/fuybooo-mall',
                templateUrl: 'app/views/fuybooo-mall/fuybooo-mall.html',
                dependencies: [
                    'scripts/fuybooo-mall/fm-ad-controller',
                    'scripts/fuybooo-mall/fm-banner-controller',
                    'scripts/fuybooo-mall/fm-header-controller',
                    'scripts/fuybooo-mall/fm-menu-controller',
                    'scripts/fuybooo-mall/fm-nav-controller',
                    'scripts/fuybooo-mall/fm-second-kill-controller',
                    'scripts/fuybooo-mall/fm-service-controller'
                ]
            })
            .state('home.fuyboooMall.home', {
                url: '/home',
                views: {
                    'fm-ad': {
                        templateUrl: 'app/views/fuybooo-mall/fuybooo-mall-ad.html',
                        controller: 'FmAdController'
                    },
                    'fm-banner': {
                        templateUrl: 'app/views/fuybooo-mall/fuybooo-mall-banner.html',
                        controller: 'FmBannerController'
                    },
                    'fm-header': {
                        templateUrl: 'app/views/fuybooo-mall/fuybooo-mall-header.html',
                        controller: 'FmHeaderController'
                    },
                    'fm-menu': {
                        templateUrl: 'app/views/fuybooo-mall/fuybooo-mall-menu.html',
                        controller: 'FmMenuController'
                    },
                    'fm-nav': {
                        templateUrl: 'app/views/fuybooo-mall/fuybooo-mall-nav.html',
                        controller: 'FmNavController'
                    },
                    'fm-second-kill': {
                        templateUrl: 'app/views/fuybooo-mall/fuybooo-mall-second-kill.html',
                        controller: 'FmSecondKillController'
                    },
                    'fm-service': {
                        templateUrl: 'app/views/fuybooo-mall/fuybooo-mall-service.html',
                        controller: 'FmServiceController'
                    }
                }
            })
        ;
        $urlRouterProvider.otherwise('');
    }]);
    // 拦截器
    app.factory('httpInterceptor', ['$q','$injector',function ($q, $injector) {
        // var commonService = $injector.get('commonService'); // 此处无法获取commonService
        var interceptor = {
            request: function (config) {
                // 在每次发送请求之前拦截，可以进行权限判断，或者参数处理等
                // 处理成功返回config，处理失败返回false，并提示处理结果
                return config;
            },
            response: function(res){
                // 在每次请求响应之后进行拦截，可以进行错误处理等
                // 出现错误，报告错误，返回res，没有错误，返回res
                var commonService = $injector.get('commonService'); // 只能在interceptor的属性内获取commonService
                // 在service中使用rootScope
                var $rootScope = $injector.get('$rootScope');
                if(res.data.code === commonService.STATUS.NOT_LOGGED_IN){
                    commonService.alert('请登录先', res.data.code);
                    // 如果用户未登录，则将用户信息清除，并显示登录入口
                    sessionStorage.removeItem(commonService.SESSION.userInfo);
                    $rootScope.$broadcast(commonService.EVENT.login, commonService.EVENT_KEY.logout);
                }
                return res;
            },
            requestError: function(request){
                // 请求之前发生了错误（请求没有发送到后台）
                // 打印错误详细信息，并处理错误
                return request;
            },
            responseError: function(response){
                // 请求经过后台处理后发生错误
                // 打印错误信息，并处理错误（一般都是跳转到错误页面，或提示用户联系客服等）
                return response;
            }
        };
        return interceptor;
    }]);
});
