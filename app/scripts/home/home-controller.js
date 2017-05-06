define(function (require) {
    var app = require('app');
    app.controller('HomeController', function ($rootScope, $scope, commonService) {
        console.log('HomeController');
        $rootScope.$on(commonService.EVENT.login, function(e,d){
            if(d === commonService.EVENT_KEY.success){
                $scope.isLoggedIn = true;
                $scope.username = sessionStorage.getItem(commonService.SESSION.userInfo).user_name;
            }
        });
        
        
        
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