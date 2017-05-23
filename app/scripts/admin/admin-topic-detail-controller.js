define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminTopicDetailController', function ($rootScope, $scope, $state, $stateParams, dataService, commonService) {
        console.log('AdminTopicDetailController');
        // $('.admin-menu .home-li').click();
        var action = 'add';
        if($stateParams.flag === 'add'){
            $scope.subTitle = '新增文章';
            action = 'add';
        }
        $scope.saveTopic = function(topic){
            // 防止digest循环
            var _topic = $.extend(true, {}, topic);
            _topic.action = action;
            dataService.saveTopic(_topic, function(res){
                console.log('保存topic:res', res);
                if(res.code === 0){
                    $state.go('home.admin.topic');
                }
                commonService.alert(res.msg, res.code);
            });
        };
        $scope.back = function(){
            $state.go('home.admin.topic');
        }

    });
});