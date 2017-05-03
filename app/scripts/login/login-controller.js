define(function(require){
    var app = require('app');
    app.controller('LoginController', function($scope, $state, commonService, dataService, Popupwin){
        console.log('LoginController:commonService', commonService);
        // 执行登录
        $scope.runLogin = function(){
            console.log($scope);
            dataService.doLogin($scope.loginInfo, function(data){
                console.log('登录返回值', data);
                if(data.code === 0){
                    Popupwin.close();
                }
                commonService.alert(data.msg, data.code === 0 ? 's' : 'd');
            })
        };
    });

});