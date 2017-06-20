define(['require'],function(require){
    var app = require('app');
    var $ = require('jquery');
    app.controller('EndlessScrollController', function($rootScope,$scope, $state,$compile, commonService, dataService, Popupwin){
        console.log('EndlessScrollController')

        // =======================================滚动显示本地数据
        var origin_texts = [];
        for(var i=0;i< 1000;i++){
            origin_texts.push({
                name: 'fuyb' + i,
                level: i
            })
        }
        var show_texts = [];
        // 初始时显示40条，滚动滚动条后，判断滚动距离显示更多条
        var page = 1;
        var size = 40;
        var maxPage = Math.ceil(origin_texts.length / size);
        show_texts = origin_texts.slice(0, page * size);

        $scope.texts = show_texts;

        // 证明 show_texts发生改变，显示出来的值就会发生改变
        // Array.prototype.push.apply(show_texts, origin_texts.slice(40, 80));

        var $map = {
            wrap: $('.js-es-wrap'),
            content: $('.js-es-content')
        };
        var MIN_HEIGHT = 50;// 当还有50px距离的时候开始加载新的数据
        var wrapHeight = $map.wrap.height();
        $map.wrap.off('scroll.es').on('scroll.es', function(e){
            // 定义加载规则
            // 规则： 容器内部内容的高度（A）会发生改变（随着滚动增加数据，高度会发生改变）， 容器自身的高度（B）不会发生改变， 容器滚动条距离顶部的高度（C）会发生改变
            // 只有在 A - B - C < MIN （滚动条距离底部的高度最小值）时，加载下一页的数据
            var contentHeight = $map.content.height();
            var scrollTop = $map.wrap.scrollTop();
            // 当滚动的距离满足条件时
            var delta = contentHeight - wrapHeight - scrollTop;
            if(delta - MIN_HEIGHT <= 0){
                $scope.$apply(function(){
                    $scope.addData();
                });

            }
        });

        $scope.addData = function(){
            var next = page + 1;
            if(next > maxPage){
                return;
            }
            Array.prototype.push.apply(show_texts, origin_texts.slice(page * size, next * size));
            page = next;
        };
        // =======================================滚动显示本地数据 end



        // 滚动显示服务器数据

        // 加载第一页的数据

        // 定义滚动事件

        // 滚动到底部时触发加载函数，加载数据显示到页面




        // 字符串查找算法
        /**
         * 查询字符串，输入字符串之后，进行匹配，使用贪婪正则匹配
         * 要求：
         * 输入apcc能匹配addPolicyContentCtrl.js
         * addPolicyContentCtrl.js
         * editPolicyContentCtrl.js
         * delPolicyContentCtrl.js
         */

    });

});