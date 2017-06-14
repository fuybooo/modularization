define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('HomeController', function ($rootScope, $scope, $state,$translate, commonService) {
        console.log('HomeController');
        $rootScope.$on(commonService.EVENT.login, function (e, d) {
            if (d === commonService.EVENT_KEY.success || d === commonService.EVENT_KEY.logout) {
                initUserInfo();
            }
        });

        var initUserInfo = function () {
            var session_user = sessionStorage.getItem(commonService.SESSION.userInfo);
            if (session_user) {
                $scope.isLoggedIn = true;
                $scope.username = JSON.parse(session_user).user_name;
            } else {
                $scope.isLoggedIn = false;
            }
        };
        // 初始化用户信息的显示
        initUserInfo();

        var toggleCount = 0; // 用来判断是否是第一次切换用户菜单，如果是第一次切换，则为document绑定事件
        $scope.toggleUserMenu = function () {
            if(toggleCount === 0){
                /**
                 * 给document绑定事件，使打开的隐藏菜单隐藏
                 */
                $(document).off('click.toggleUserMenu').on('click.toggleUserMenu', function (e) {
                    // 在非angular的上下文环境改变$scope的属性,不会被更新到视图上去,需要使用$apply封装一下
                    $scope.$apply(function () {
                        if (e && e.whith === 3) return;
                        if ($('.js-nav-user-li').is(':hidden')) return;
                        if ($(e.target).hasClass('js-nav-user')) return;
                        $scope.isUserMenu = false;
                    });
                });
            }
            toggleCount ++;
            $scope.isUserMenu = !$scope.isUserMenu;
        };
        /**
         * 切换语言
         */
        $scope.language = localStorage.getItem(commonService.SESSION.localLanguage) || 'cn';
        $scope.changeLanguage = function(language){
            $translate.use(language);
            localStorage.setItem(commonService.SESSION.localLanguage, language);
        }

        // $('.js-nav-user').off('click').on('click', function(){
        //     // 会直接更新视图,不需要手动触发$digest
        //     $scope.isUserMenu = !$scope.isUserMenu;
        // })

        // 测试webSocket
        // var ws = dataService.createWebSocket.getInstance();
        // // 创建成功
        // ws.onopen = function () {
        //     console.log('onopen', arguments)
        //     ws.send('fuybooo');
        // };
        // // 创建失败
        // ws.onerror = function () {
        //     console.log('onerror', arguments)
        // };
        // // 接受消息
        // ws.onmessage = function (e) {
        //     console.log('onmessage', arguments)
        //     console.log(e.data);
        //
        // };
        // // 连接关闭
        // ws.onclose = function () {
        //     console.log('onclose ', arguments)
        // };


    });
});