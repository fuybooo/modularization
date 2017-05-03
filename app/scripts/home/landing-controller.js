define(function(require){
    var app = require('app');
    app.controller('LandingController', function($scope, $state, $http){
        console.log('LandingController');
        $scope.landingTest = function(){
            // 测试跨域请求get
            $http({
                method: 'get',
                url: 'http://127.0.0.1:3333/request?data1=中文参数&name=name',
                params: {
                    name2: '我是中文参数'
                }
            }).success(function(data){
                console.log('success', data);
            });
        };


        $scope.landingPost = function(){
            $http({
                method: 'post',
                url: 'http://127.0.0.1:3333/save',
                data: {
                    id: 1,
                    name: '我是中文参数',
                    disabled: false
                }
            }).success(function(data){
                console.log('success', data);
            })
        }
    });
    
});