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
            
        }
        
        var getOffsetTop = function(id){
            return $('#' + id).parent().parent()[0].offsetTop + $('#' + id)[0].offsetTop - $(document).scrollTop()
        };
        var li_array = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'];
        // 为body添加滚动事件
        $(window).on('scroll', function(e){
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
        })
    });
});