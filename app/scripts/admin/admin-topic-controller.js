define(function(require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminTopicController', function ($rootScope, $scope, $state, $compile, dataService, commonService, Popupwin) {
        // 监听登录事件，登录之后查询数据
        $rootScope.$on(commonService.EVENT.login, function (e, d) {
            if (d === commonService.EVENT_KEY.success) {
                if($state.current.name === 'home.admin.topic'){
                    $scope.getTopics();
                }
            }
        });
        // 页面中的缓存信息
        // 缓存第一次从后台获取的数据，如果不刷新页面，不跳转页面，该缓存一致存在，且之后操作的所有数据都是来自该缓存
        // 如，增删改记录，需要修改该缓存中的数据，并且向后台发送请求。
        // 查询也是从该缓存中过滤进行查询
        // ----------------------------
        // 目前只适用与前端分页的情况
        var cache = {};
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
                        return '<span class="glyphicon glyphicon-list-alt" title="查看" ng-click="viewTopic(\'' + row.id + '\')"></span>' +
                            '<span class="glyphicon glyphicon-pencil" title="修改" ng-click="editTopic(\'' + row.id + '\')"></span>' +
                            '<span class="glyphicon glyphicon-trash" title="删除" ng-click="delTopic(\'' + row.id + '\')"></span>';
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
                cache.data = res.data || [];
                cache.origin = commonService.deepClone(cache.data);
                renderTable(cache.data);
            });
        };
        $scope.getTopics();
        $scope.searchTopics = function(){
            cache.data = cache.origin.filter(function(item){
                var title = $scope.query.title;
                var isTitleMatch = false;
                if(item.topic_title.indexOf(title) !== -1){
                    isTitleMatch = true;
                }
                var isDateMatch = false;
                var dateStr = item.topic_date.slice(0, 19).replace('T', ' ');
                if(dateStr >= $scope.query.postDateStart && dateStr <= $scope.query.postDateEnd){
                    isDateMatch = true;
                }
                return isTitleMatch && isDateMatch;
            });
            renderTable(cache.data);
        };
        var getDataById = function(id){
            for(var i=0,l=cache.origin.length;i<l;i++){
                if(cache.origin[i].id === id){
                    return cache.origin[i];
                }
            }
        };
        $scope.addTopic = function(){
            $state.go('home.admin.topicDetail', {
                flag: 'add'
            });
        };
        $scope.editTopic = function(id){
            $state.go('home.admin.topicDetail', {
                flag: 'edit',
                id: id
            });
        };
        $scope.viewTopic = function(id){
            $state.go('home.admin.topicDetail', {
                flag: 'view',
                id: id
            });
        };
        $scope.delTopic = function(id){
            // 快捷弹出删除提示框，无需其他配置项
            // Popupwin.create(function(){
            //     // 放弃老的请求方法
            //     // dataService.delTopic({
            //     //     action: 'del',
            //     //     ids: id
            //     // }, function(res){
            //     //     commonService.alert(res.msg, res.code);
            //     //     Popupwin.close();
            //     // });
            //     // 使用最新的请求方法
            //     dataService.post(dataService.url.topic, {
            //         action: 'del',
            //         ids: id
            //     }, Popupwin.close);
            // });
            var ids = id || '';
            if(!id){
                var selections = $table.bootstrapTable('getSelections');
                for(var i=0,l=selections.length;i<l;i++){
                    ids += selections[i].id;
                    if(i < l - 1){
                        ids += ',';
                    }
                }
            }
            Popupwin.create(id?'确定删除该项？':'确定删除选中项？', function(){
                dataService.post(dataService.url.topic, {
                    action: 'del',
                    ids: ids
                }, function(){
                    commonService.ADU.del(cache.data, ids.split(','));
                    Popupwin.close();
                });
            });
        };

    });
});