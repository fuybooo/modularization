define(function(require){
    var app = require('app');
    var $ = require('jquery');
    /**
     * home-nav
     * 加载首页导航栏
     */
    app.directive('homeNav', function($state){
        return {
            replace: true,
            templateUrl: 'app/views/nav.html',
            controller: 'HomeController',
            link: function(scope, ele, attr){
                var $navLi = $(ele).find('.navbar-nav li');
                var $navA = $(ele).find('.navbar-nav li a');
                // 刷新页面时保持选中状态
                if($state.current.name !== 'home.land'){
                    $navLi.removeClass('active');
                    $navA.each(function(){
                        if($(this).attr('ui-sref') === $state.current.name){
                            $(this).parent().addClass('active');
                            var dropDown = $(this).parent().parent().parent();
                            if(dropDown.hasClass('dropdown')){
                                dropDown.addClass('active');
                            }
                        }
                    });
                }
                // 给导航栏上的元素绑定事件, 实际上这个事件不需要写,只要在url跳转时加上active即可
                $navA.off('click.hn').on('click.hn', function(){
                    var target = $(this).parent();
                    if(!target.hasClass('dropdown')){ // 点击的是下拉菜单时,不做任何事情,否则
                        // 清除所有的active
                        $navLi.removeClass('active');
                        // 改变导航栏样式
                        if($(this).parent().parent().hasClass('dropdown-menu')){
                            target = $(this).parent().parent().parent();
                            $(this).parent().addClass('active');
                        }
                        target.addClass('active');
                    }
                });
            }
        };
    })
    
    /**
     * pop-login
     * 功能:弹出登录界面
     */
    .directive('popLogin', function(popupwin){
        return {
            link: function(scope,element,attrs){
                $(element).click(function(){
                    popupwin.create({
                        title: '登录',
                        scope: scope, // 需要使用$compile编译html
                        footer: false, // 不需要弹出层自带的按钮
                        htmlUrl: 'app/views/login-box.html'
                    });
                });
            }
        };
    })
    ;

});