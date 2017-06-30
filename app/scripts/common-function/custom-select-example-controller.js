define(function(require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('CustomSelectExampleController', function ($rootScope, $scope) {
        // 一般通过请求获取数据
        var deviceType = [
            {
                id: 0,
                value: 'IOS'
            },
            {
                id: 1,
                value: 'Android'
            }
        ];
        // 处理下拉框数据
        var _deviceType = [];
        for(var i=0,l=deviceType.length;i<l;i++){
            var item = deviceType[i];
            _deviceType.push({
                key: item.id,
                value: item.value
            });
        }
        $scope.deviceType = _deviceType;
        var deviceColumns = [
            {
                id: 0,
                value: '设备型号'
            },
            {
                id: 1,
                value: '设备分组'
            },
            {
                id: 2,
                value: '设备描述'
            },
            {
                id: 3,
                value: '设备名称'
            },
            {
                id: 4,
                value: 'IMEI'
            }

        ];
        // 处理下拉框数据
        var _deviceColumns = [];
        for(var i=0,l=deviceColumns.length;i<l;i++){
            var item = deviceColumns[i];
            _deviceColumns.push({
                key: item.id,
                value: item.value
            });
        }
        $scope.deviceColumns = _deviceColumns;
        var deviceModel = [
            {
                id: 0,
                value: 'Lenovo A7600-m'
            },
            {
                id: 1,
                value: 'HUAWEI MT7-CL00'
            },
            {
                id: 2,
                value: 'HUAWEI MT7-CL00'
            },
            {
                id: 3,
                value: 'SM-N9100'
            },
            {
                id: 4,
                value: 'H60-L01'
            },
            {
                id: 5,
                value: 'HUAWEI NXT-AL10'
            },
            {
                id: 6,
                value: 'HHT6A'
            },
            {
                id: 7,
                value: '苹果'
            },
            {
                id: 8,
                value: '小米'
            }
        ];
        // 处理下拉框数据
        var _deviceModel = [];
        for(var i=0,l=deviceModel.length;i<l;i++){
            var item = deviceModel[i];
            _deviceModel.push({
                key: item.id,
                value: item.value
            });
        }
        $scope.deviceModel = _deviceModel;
    });
});