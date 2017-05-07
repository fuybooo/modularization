define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.controller('LoginController', function($rootScope,$scope, $state,$compile, commonService, dataService, Popupwin){
        // 执行登录
        $scope.runLogin = function(){
            // 验证码
            if (commonService.validateCode.toLowerCase() !== $scope.loginInfo.validateCode.toLowerCase()) {
                commonService.alert('验证码不正确!', 'd');
                return;
            }
            dataService.doLogin($scope.loginInfo, function(data){
                console.log('登录返回值', data);
                if(data.code === 0){
                    Popupwin.close();
                    // controller之间的通信
                    // 使用事件传播机制,让$rootScope广播事件,所有的controller只要监听了loginEvent都可以被触发
                    sessionStorage.setItem(commonService.SESSION.userInfo, JSON.stringify(data.data));
                    $rootScope.$broadcast(commonService.EVENT.login, commonService.EVENT_KEY.success);
                    // 登录成功建立webSocket
                    dataService.webSocket.send(data.data.user_name);
                    // var ws = dataService.createWebSocket.getInstance();
                    // ws.onopen = function(){
                    //     ws.send(data.data.user_name);
                    // };
                    dataService.webSocket.onmessage = function(evt){
                        console.log('login:onmessage',evt.data);
                    }
                }
                commonService.alert(data.msg, data.code === 0 ? 's' : 'd');
            })
        };
    });

});