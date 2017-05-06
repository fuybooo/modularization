define(function(require){
    var app = require('app');
    app.controller('RegisterController', function($scope, $state, commonService, dataService,Popupwin){
        console.log('RegisterController');
        $scope.doRegister = function(){
            if (commonService.validateCode.toLowerCase() !== $scope.registerInfo.validateCode.toLowerCase()) {
                commonService.alert('验证码不正确!', 'd');
                return;
            }
            dataService.doRegister($scope.registerInfo, function(res){
                console.log(res);
                if(code === 0){
                    // 注册成功,自动登录
                    Popupwin.close();
                }
                commonService.alert(res.msg, res.code === 0 ? 's' : 'd');
            });
        };
    });

});