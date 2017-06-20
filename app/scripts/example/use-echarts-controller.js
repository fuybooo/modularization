define(function(require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('UseEchartsController', function ($scope, dataService) {
        console.log('UseEchartsController');
        var type_s_data = [22,11,33,44,55];
        var typeOptionFn = function(){
            return {
                title: {
                    text: '违规类型',
                    padding: [20, 0, 5, 30],
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ["离线", "安装违规APP", "root", "敏感词", "上网记录"]
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        barMaxWidth: 50,
                        itemStyle: {
                            normal: {
                                color: '#60C0DD',
                                label: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        },
                        data: type_s_data
                    }
                ]
            };
        };
        echarts.init($('#chart-illegal-type')[0]).setOption(typeOptionFn());
$scope.changeData = function(){
    type_s_data = [100,50,10,5,1];
    echarts.init($('#chart-illegal-type')[0]).setOption(typeOptionFn());
};

        var timeOption = {
            title: {
                text: '按时间显示违规数量',
                padding: [20, 0, 5, 30],
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: '时间段：{b}时<br/>{a}：{c}'
            },
            calculable: true,
            xAxis: [
                {
                    name: '时间段',
                    type: 'category',
                    boundaryGap: false,
                    data: ['0~3', '3~6', '6~9', '9~12', '12~15', '15~18', '18~21', '21~0'],
                }
            ],
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: [
                {
                    name: '数量',
                    type: 'line',
                    data: [11, 11, 15, 13, 12, 13, 11, 11, 15, 13, 12, 13]
                }
            ]

        };

        echarts.init($('#chart-illegal-time')[0]).setOption(timeOption);


        var deptOption = {
            title: {
                text: '按部门显示违规数量',
                padding: [20, 0, 5, 30],
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: '班：{b}<br/>{a}：{c}'
            },
            calculable: true,
            xAxis: [
                {
                    name: '班',
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                }
            ],
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    barMaxWidth: 50,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top'
                            }
                        }
                    },
                    data: [11, 11, 15, 13, 12, 13, 11, 11, 15, 13, 12, 13]
                }
            ]

        };

        echarts.init($('#chart-illegal-dept')[0]).setOption(deptOption);


    });
});