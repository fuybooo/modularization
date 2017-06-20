define(['require'],function(require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('LandingController', function ($scope, $state, $http, dataService) {
        var jqMap = {
            '1.main': $('.js-landing-text-main'),
            '1.sub': $('.js-landing-text-sub'),
            '1.name': $('.js-landing-text-name')
        };
        // 设定元素的初始状态
        var startStatus = {
            '1.main': {
                left: '-100%',
                opacity: '.5'
            },
            '1.sub': {
                right: '-100%',
                opacity: '.3'
            },
            '1.name': {
                left: '-100%',
                opacity: '.2'
            }
        };
        // 设定元素的最终效果
        var endStatus = {
            '1.main': {
                animate:{
                    left: '20%',
                    opacity: '1'
                },
                speed: 1000
            },
            '1.sub': {
                animate:{
                    right: '70%',
                    opacity: '1'
                },
                speed: 800
            },
            '1.name': {
                animate:{
                    left: '76%',
                    opacity: '1'
                },
                speed: 1500
            }
        };
        // 执行动画效果
        var doAnimate = function (type) {
            if(type === undefined){
                // 执行所有动画
                for(var k in endStatus){
                    if(!Object.hasOwnProperty(k)){
                        jqMap[k].animate(endStatus[k].animate, endStatus[k].speed);
                    }
                }
                return;
            }
            // 执行动画
            jqMap[type].animate(endStatus[type].animate, endStatus[type].speed);
            
        };
        // 元素离开可视区域之后,将元素的位置重置,以便下次进行动画效果
        var doReset = function(type){
            if(type === undefined){
                // 全部reset
                for(var k in startStatus){
                    if(!Object.hasOwnProperty(k)){
                        jqMap[k].css(startStatus[k]);
                    }
                }
                return;
            }
            jqMap[type].css(startStatus[type]);
        };
        doReset();
        doAnimate();
        var visibility = {
            '1.main': true,
            '1.sub': true,
            '1.name': true
        };
        var originValue = {
            '1.main': true,
            '1.sub': true,
            '1.name': true
        };
        var listenText = function (value, type) {
            if (value !== originValue[type]) {
                originValue[type] = value;
                if (value) {
                    doAnimate(type);
                }
            }
        };
        $(window).on('scroll.fuybooo.common', function () {
            var NAV_HEIGHT = 52;
            var SCREEN_MAX_1 = 30;
            var getTop = function(eleKey){
                return jqMap[eleKey][0].offsetTop + NAV_HEIGHT - $(document).scrollTop();
            };
            for(var k in visibility){
                if(!Object.hasOwnProperty(k)){
                    if(getTop(k) > SCREEN_MAX_1){
                        visibility[k] = true;
                    }else{
                        visibility[k] = false;
                        doReset(k);
                    }
                    listenText(visibility[k], k);
                }
            }
        });
    });
    
});