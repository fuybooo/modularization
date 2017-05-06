define(function(require){
    var app = require('app');
    app.controller('RegisterController', function($scope, $state, commonService, dataService){
        console.log('RegisterController');
        $scope.doRegister = function(){
            if (commonService.validateCode !== $scope.registerInfo.validateCode) {
                commonService.alert('验证码不正确!', 'd');
                return;
            }
            dataService.doRegister($scope.registerInfo, function(res){
                console.log(res);
                
            });
        };
    });

});