define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminTopicController', function ($rootScope, $scope, $state, $compile, dataService, commonService) {
        $rootScope.$on(commonService.EVENT.login, function (e, d) {
            if (d === commonService.EVENT_KEY.success) {
                $scope.getTopics();
            }
        });

        $scope.query = {};
        var $table = $('#bt-admin-topic');
        // initTable
        $table.bootstrapTable({
            striped: true,
            classes: 'table table-hover table-layout-fixed',
            columns: [
                {
                    checkbox: true,
                    width: '2%'
                },
                {
                    title: '序号',
                    align: 'center',
                    width: '6%',
                    sortable: true,
                    formatter: function(value, row, index){
                        return index + 1;
                    }
                },
                {
                    field: 'topic_title',
                    title: '标题',
                    align: 'center',
                    width: '20%'
                },
                {
                    field: 'topic_desc',
                    title: '描述',
                    class: 'td-ellipsis',
                    align: 'left',
                    width: '40%',
                    formatter: function(value){
                        return '<span title="' + value + '">' + value + '</span>'
                    }
                },
                {
                    field: 'topic_date',
                    title: '发布日期',
                    align: 'center',
                    width: '10%',
                    formatter: function(value){
                        return value.slice(0, 19).replace('T', ' ');
                    }
                },
                {
                    field: 'user_name',
                    title: '发布人',
                    align: 'center',
                    sortable: true,
                    width: '7%'
                },
                {
                    field: 'topic_type',
                    title: '类型',
                    align: 'center',
                    sortable: true,
                    width: '5%',
                    formatter: function(value){
                        var res = '';
                        if(value === 1){
                            res = '系统';
                        }else if(value === 2){
                            res = '日志';
                        }
                        return res;
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    formatter: function(value,row){
                        return '<span class="glyphicon glyphicon-list-alt" title="查看" ng-click="viewTopic(' + row.id + ')"></span>' +
                            '<span class="glyphicon glyphicon-pencil" title="修改" ng-click="editTopic(' + row.id + ')"></span>' +
                            '<span class="glyphicon glyphicon-trash" title="删除" ng-click="delTopic(' + row.id + ')"></span>';
                    }
                }
            ]
        });
        var renderTable = function(data){
            $table.bootstrapTable('load', data);
            // 加载完数据，编译bootstrap-table，使其具有angular上下文环境
            // 此处存在另一个方案，使用jquery对操作按钮进行事件绑定。哪一种更好？更加节省性能？如何去测试？在长期的开发过程中，哪一种会更有优势？
            $compile($table)($scope);
        };

        $scope.getTopics = function(){
            dataService.getTopics({
                title: $scope.query.title,
                postDateStart: $scope.query.postDateStart,
                postDateEnd: $scope.query.postDateEnd
            }, function(res){
                renderTable(res.data || []);
            });
        };
        $scope.getTopics();

        $scope.addTopic = function(){
            $state.go('home.admin.topicDetail', {
                flag: 'add'
            });
        };
    });
});