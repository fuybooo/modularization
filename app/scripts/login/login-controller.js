define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.controller('LoginController', function($scope, $state,$compile, commonService, dataService, Popupwin){
        // 执行登录
        $scope.runLogin = function(){
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