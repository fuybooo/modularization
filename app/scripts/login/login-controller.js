define(function(require){
    var app = require('app');
    app.controller('LoginController', function($scope, $state){
        console.log('LoginController');
        // 赋值
        $scope.login = {};

        // 执行登录
        $scope.runLogin = function(login){
            console.log($scope);
            $state.go('app.dashboard');
        };
    });

});