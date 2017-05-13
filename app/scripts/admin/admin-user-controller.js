define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminUserController', function ($rootScope, $scope, dataService, commonService) {
        console.log('AdminUserController');
        var $table = $('#bt-admin-user');
        
        var initTable = function () {
            $table.bootstrapTable({
                stripe: true,
                pagination: true,
                pageNumber: 1,
                pageSize: 7,
                pageList: [5, 10, 20, 50, 100],
                columns: [
                    {
                        checkbox: true
                    },
                    {
                        field: 'user_name',
                        title: '名称',
                        sortable: true
                    },
                    {
                        field: 'user_email',
                        title: '邮箱',
                        sortable: true,
                    },
                    {
                        field: 'user_phone_no',
                        title: '手机',
                        sortable: true,
                    },
                    {
                        field: 'user_sex',
                        title: '性别',
                        width: '5%',
                        sortable: true,
                        formatter: function (value) {
                            var res = '-';
                            if(value === 1){
                                res = '女';
                            }else if(value === 2){
                                res = '男';
                            }
                            return res;
                        }
                    },
                    {
                        field: 'user_birthday',
                        title: '生日',
                        sortable: true,
                    },
                    {
                        field: 'user_native_place',
                        title: '籍贯',
                        sortable: true,
                    },
                    {
                        field: 'user_state',
                        title: '是否在职',
                        width: '5%',
                        sortable: true,
                        formatter: function (value, row, index) {
                            var res = value === 1 ? '在职' : '离职';
                            var cls = value === 1 ? '' : 'red';
                            return '<span class="' + cls + '">' + res + '</span>';
                        }
                    },
                    {
                        title: '操作',
                        formatter: function () {
                            var _html = '<span class="glyphicon glyphicon-pencil"></span>' +
                                '<span class="glyphicon glyphicon-trash"></span>';
                            return _html;
                        }
                    }
                ]
            });
        };
        
        var renderTable = function () {
            dataService.getUsers({}, function (res) {
                console.log(res)
                if (res.code === 0) {
                    $table.bootstrapTable('load', res.data);
                }
            })
        };
        
        $scope.query = function () {
        
        };
        
        
        // 初始化表格
        initTable();
        // 加载表格数据
        renderTable();
    });
});