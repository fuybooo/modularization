define(['require'],function(require){
    var app = require('app');
    var $ = require('jquery');
    app.controller('PollingSpecialController', function($rootScope,$scope, $state,$compile, commonService, dataService, Popupwin){
        console.log('PollingSpecialController')

        var loadChart = function(id, shares){
            if(!shares){
                console.log('没有获取数据');
                return;
            }
            var option = {
                title: {
                    text: '股票变化情况',
                    padding: [20, 0, 5, 30],
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}<br/>{a}：{c}'
                },
                calculable: true,
                xAxis: [
                    {
                        name: '号码',
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '点',
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
                        data: shares
                    }
                ]

            };

            echarts.init($('#' + id)[0]).setOption(option);
        };
        // 轮询： 前端定时向后端发送请求， 服务器接到请求马上响应，并关闭连接
        loadChart('poll-1', [70,71,72,77,78,97,78,78,67,88]);
        // var ex1 = setInterval(function(){
        //     dataService.get(dataService.url.poll,{action: 'action1'}, function(data){
        //         // 展示图表
        //         loadChart('poll-1', data.data.shares);
        //     });
        // }, 2000);
        //
        // $scope.stop = function(){
        //     clearInterval(ex1);
        // };

        // 长轮询： 客户端向服务器发送请求， 服务器接到请求后，hold住，直到有新消息（需要返回数据时）才响应，并关闭连接，客户端处理完成之后，再向服务器发送请求

        // 长连接： 在页面内嵌一个iframe，将这个iframe的src属性设置为对一个长连接的请求，或者是一个xhr请求，那么服务器就能不停的向前端发送数据

        // var longPolling = function(){
        //     dataService.get(dataService.url.poll, {action: 'action2'}, function(data){
        //         console.log('请求成功');
        //         var shares = data.data.shares;
        //         var isT = true;
        //         for(var i=0,l=shares.length;i<l;i++){
        //             if(shares[i] % 3 !== 0){
        //                 isT = false;
        //                 break;
        //             }
        //         }
        //         if(isT){
        //             loadChart('poll-1', data.data.shares);
        //         }
        //         longPolling();
        //     }, function(e){
        //         console.log('错误处理：',e);
        //         longPolling();
        //     });
        // };
        // longPolling();

        // webSocket


    });

});