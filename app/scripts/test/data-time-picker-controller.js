define(function(require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('DataTimePickerController', function ($rootScope, $scope, $location,$anchorScroll) {
        console.log('DataTimePickerController');
        var dateOptions = {
            weekStart: 1,
            format: 'yyyy-mm-dd',
            minView: 2,
            todayBtn:  true,
            autoclose: true,
            todayHighlight: true
        };
        var setDateChange = function(id){
            var method = 'setEndDate';
            var _id = id.replace('End', 'Start');
            if(id.indexOf('End') === -1){
                method = 'setStartDate';
                _id = id.replace('Start', 'End');
            }
            return function(ev) {
                $('#' + _id).datetimepicker(method, ev.date);
            }
        };
        var resetDateChange = function(id){
            $('#' + id).datetimepicker('remove').datetimepicker(dateOptions).on('changeDate', setDateChange(id));
        };
        // 当时间改变后，将其对应的时间设置一个限制，如开始时间选择了a，则对应的结束时间不能选比a小的时间
        $('#updateTimeStart').datetimepicker(dateOptions).on('changeDate', setDateChange('updateTimeStart'));
        $('#updateTimeEnd').datetimepicker(dateOptions).on('changeDate', setDateChange('updateTimeEnd'));
        $('#occurTimeStart').datetimepicker(dateOptions).on('changeDate', setDateChange('occurTimeStart'));
        $('#occurTimeEnd').datetimepicker(dateOptions).on('changeDate', setDateChange('occurTimeEnd'));
        // 当手动清除时间后，将对应的时间框的限制也清除掉
        $scope.$watch('query.updateTimeStart', function(n){
            if(n === undefined) return;
            if(n === ''){
                resetDateChange('updateTimeEnd');
            }
        });
        $scope.$watch('query.updateTimeEnd', function(n){
            if(n === undefined) return;
            if(n === ''){
                resetDateChange('updateTimeStart');
            }
        });
        $scope.$watch('query.occurTimeStart', function(n){
            if(n === undefined) return;
            if(n === ''){
                resetDateChange('occurTimeEnd');
            }
        });
        $scope.$watch('query.occurTimeEnd', function(n){
            if(n === undefined) return;
            if(n === ''){
                resetDateChange('occurTimeStart');
            }
        });



        console.log('获取下拉框默认值', $scope.social);
        $scope.getSelectValue = function(){
            console.log('获取下拉框默认值', $scope.social);
        }

        // display 为inline-block

        $scope.spans = [
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            },
            {
                name: '敏感词1'
            }
        ];


        // 对moment的应用

        console.log(moment);
        console.log(moment());
        console.log(moment('2017-06-90'));

        // 测试ajax请求
        $.ajax({
            url: 'http://127.0.0.1:3003/login',
            data: {
                username:'1',
                password:'1',
                validateCode:'oknefx'
            },
            type: 'post',
            success: function(data){
                console.log('success:', data);
            },
            error: function(data){
                console.log('error:', data);
            }
        });

        // 如何使用全局ajax处理参数

        $(document).ajaxStart(function(){
           console.log('ajaxStart:', arguments);
        });

        $(document).ajaxSend(function(){
           console.log('ajaxSend:', arguments);
        });

        $(document).ajaxSuccess(function(){
           console.log('ajaxSuccess:', arguments);
        });

        $(document).ajaxComplete(function(){
           console.log('ajaxComplete:', arguments);
        });

        $(document).ajaxError(function(){
           console.log('ajaxError:', arguments);
        });

        $(document).ajaxStop(function(){
           console.log('ajaxStop:', arguments);
        });


    });
});