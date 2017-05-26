define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminTopicDetailController', function ($rootScope, $scope, $state, $stateParams, dataService, commonService) {
        $scope.topic = {};
        var reviewTopic = function(){
            var id = $stateParams.id;
            if(id) {
                dataService.get(dataService.url.topic, {action: 'findById', id: id}, function (res) {
                    if (res.code === 0) {
                        var topicData = res.data[0];
                        $scope.topic = {
                            id: topicData.id,
                            title: topicData.topic_title,
                            desc: topicData.topic_desc,
                            date: topicData.topic_date,
                            type: topicData.topic_type,
                            content: topicData.topic_content
                        };
                    }
                });
            }else{
                commonService.alert('请重新查看此页面', 'd');
            }
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