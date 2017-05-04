define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    /**
     * home-nav
     * 加载首页导航栏
     */
    app.directive('homeNav', function ($state) {
        return {
            replace: true,
            templateUrl: 'app/views/nav.html',
            controller: 'HomeController',
            link: function (scope, ele, attr) {
                var $navLi = $(ele).find('.navbar-nav li');
                var $navA = $(ele).find('.navbar-nav li a');
                // 刷新页面时保持选中状态
                if ($state.current.name !== 'home.land') {
                    $navLi.removeClass('active');
                    $navA.each(function () {
                        if ($(this).attr('ui-sref') === $state.current.name) {
                            $(this).parent().addClass('active');
                            var dropDown = $(this).parent().parent().parent();
                            if (dropDown.hasClass('dropdown')) {
                                dropDown.addClass('active');
                            }
                        }
                    });
                }
                $navA.off('click.hn').on('click.hn', function () {
                    var target = $(this).parent();
                    if (!target.hasClass('dropdown')) { // 点击的是下拉菜单时,不做任何事情,否则
                        // 清除所有的active
                        $navLi.removeClass('active');
                        // 改变导航栏样式
                        if ($(this).parent().parent().hasClass('dropdown-menu')) {
                            target = $(this).parent().parent().parent();
                            $(this).parent().addClass('active');
                        }
                        target.addClass('active');
                    }
                });
            }
        };
    })
    ;
    
});