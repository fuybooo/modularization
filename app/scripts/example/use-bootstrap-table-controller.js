define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('UseBootstrapTableController', function ($scope, dataService) {
        console.log('UseBootstrapTableController');
        var $table1 = $('#bt-ex-1');
        var renderTable = function(){
            dataService.getStudentsScores(function(res){
                $table1.bootstrapTable('load', res.data);
            });
        };
        renderTable();





        var $table = $('#dashboard-table');
        var initTable = function () {
            $table.bootstrapTable({
                pagination: true,
                pageNumber: 1,
                pageSize: 5,
                pageList: [5, 10, 20, 50, 100],
                sidePagination: "client",
                // sidePagination: "server",
                checkboxHeader: true,
                sortable: true,
                striped: true,
                columns: [
                    {
                        field: 'cell.checkbox',
                        checkbox: true
                    },
                    {
                        field: 'cell.devicename',
                        title: '设备型号',
                        sortable: true
                    },
                    {
                        field: 'cell.owner',
                        title: '持有人',
                        sortable: true
                    },
                    {
                        field: 'cell.exceptionType',
                        title: '告警类型',
                        sortable: true
                    },
                    {
                        field: 'cell.alarmContent',
                        title: '告警内容',
                        sortable: true
                    },
                    {
                        field: 'cell.occurTime',
                        title: '首次发生时间',
                        sortable: true
                    },
                    {
                        field: 'cell.updateTime',
                        title: '最后发生时间',
                        sortable: true
                    },
                    {
                        field: 'cell.alarmLevel',
                        title: '告警级别',
                        sortable: true
                    },
                    {
                        field: 'cell.repeatNum',
                        title: '发生次数',
                        sortable: true
                    },
                    {
                        field: 'cell.alarmStatus',
                        title: '告警状态',
                        sortable: true
                    },
                    {
                        field: 'cell.position',
                        title: '定位',
                        sortable: true
                    },
                    {
                        field: 'cell.ackUserName',
                        title: '确认人',
                        sortable: true
                    },
                    {
                        field: 'cell.ackTime',
                        title: '确认时间',
                        sortable: true
                    }
                ],
                onPageChange: function (number, size) {
                    pageNumber = number;
                    pageSize = size;
                    renderTable();
                },
                onSort: function (name, order) {
                    sortName = name;
                    sortOrder = order;
                    renderTable();
                }
            });
        };
        $scope.query = {};
        $scope.tip = {};
        initTable();
        var renderTable = function () {
            // dashboardService.getDashboardData({
            //     pageNumber: pageNumber,
            //     pageSize: pageSize,
            //     sortName: sortName,
            //     sortOrder: sortOrder,
            //     updateTimeStart: $scope.query.updateTimeStart,
            //     updateTimeEnd: $scope.query.updateTimeEnd,
            //     occurTimeStart: $scope.query.occurTimeStart,
            //     occurTimeEnd: $scope.query.occurTimeEnd,
            //     alarmLevel: $scope.query.alarmLevel,
            //     alarmStatus: $scope.query.alarmStatus
            // }, function (data) {

            /**
             * 测试数据
             */
            var _data = [];
            for(var i=0;i<100;i++){
                _data.push({
                    cell:{
                        devicename: 1,
                        owner: 1,
                        exceptionType: 1,
                        alarmContent: 1,
                        occurTime: 1,
                        updateTime: 1,
                        alarmLevel: 1,
                        repeatNum: 1,
                        alarmStatus: 1,
                        position: 1,
                        ackUserName: 1,
                        ackTime: 1
                    }
                });
            }
            var data = {
                totalperleg: {
                    general: 1,
                    critical: 1,
                    emergency: 1,
                    prompt: 1,
                    unconfirm: 1
                },
                data: _data
            };
            /**
             *
             */
            $table.bootstrapTable('load', data.data);
            $scope.tip.general = data.totalperleg.general;
            $scope.tip.critical = data.totalperleg.critical;
            $scope.tip.emergency = data.totalperleg.emergency;
            $scope.tip.prompt = data.totalperleg.prompt;
            $scope.tip.unconfirm = data.totalperleg.unconfirm;
            // });
        };
        renderTable();

    });
});