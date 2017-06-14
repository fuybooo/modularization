define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('ScrollController', function ($rootScope, $scope, $location,$anchorScroll) {
        console.log('ScrollController');
        $scope.changeAnchor = function(e,anchor){
            // 滚动右侧内容
            $location.hash(anchor);
            $anchorScroll();
            // 激活点击的标签
            $(e.target).addClass('active').siblings().removeClass('active');
            
        };
        var li_array = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'];
        var parentTop = $('#list-' + li_array[0]).parent().parent()[0].offsetTop;
        var getOffsetTop = function(id){
            // 父容器距离顶部的距离 + 内容距离父容器顶部的距离 - 滚动距离
            return parentTop + $('#' + id)[0].offsetTop - $(document).scrollTop();
        };
        
        // 为body添加滚动事件
        $(window).on('scroll.fuybooo.common', function(e){
            var leftSideOffsetTop = $('.js-scroll-left-side').parent()[0].offsetTop - $(document).scrollTop();
            if(leftSideOffsetTop < 70){
                $('.js-scroll-left-side').addClass('pf t70');
            }else{
                $('.js-scroll-left-side').removeClass('pf t70');
            }
            var topValueList = [];
            for(var i=0; i<li_array.length;i++){
                topValueList.push(getOffsetTop(li_array[i]));
            }
            var min;
            for(var i=0;i<topValueList.length;i++){
                if(topValueList[i] >= 0){
                    min = topValueList[i];
                    break;
                }
            }
            for(var i=0;i<topValueList.length;i++){
                if(topValueList[i] >= 0){
                    if(topValueList[i] <= min){
                        min = topValueList[i];
                    }
                }
            }
            $('#list-a' + (topValueList.indexOf(min) + 1)).addClass('active').siblings().removeClass('active');
        });
    });
});