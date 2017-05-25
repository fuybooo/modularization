define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminTopicDetailController', function ($rootScope, $scope, $state, $stateParams, dataService, commonService) {
        $scope.topic = {};
        var reviewTopic = function(){
            $scope.topic = {
                title: $rootScope.topic.record.topic_title,
                desc: $rootScope.topic.record.topic_desc,
                date: $rootScope.topic.record.topic_date,
                type: $rootScope.topic.record.topci_type,
                content: $rootScope.topic.record.topci_content
            };
        };
        var action = '';
        if($stateParams.flag === 'add'){
            $scope.subTitle = '新增文章';
            action = 'add';
            $scope.topic.type = 1;
        }else if($stateParams.flag === 'edit'){
            $scope.subTitle = '修改文章';
            action = 'edit';
            reviewTopic();
        }else if($stateParams.flag === 'view'){
            $scope.isOnlyView = true;
            $scope.subTitle = '查看文章';
            reviewTopic();
        }
        $scope.saveTopic = function(topic){
            var isAdd = arguments[1];

            // 防止digest循环
            var _topic = $.extend(true, {}, topic);
            _topic.action = action;
            dataService.saveTopic(_topic, function(res){
                if(!isAdd) {
                    if (res.code === 0) {
                        $scope.back();
                    }
                }
            });
        };
        $scope.back = function(){
            $state.go('home.admin.topic');
        }

    });
});