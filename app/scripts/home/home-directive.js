define(function(require) {
    var app = require('app');
    var $ = require('jquery');
    /**
     * home-nav
     * 加载首页导航栏
     */
    app.directive('homeNav', function ($state, $injector) {
        return {
            replace: true,
            templateUrl: 'app/views/nav.html',
            controller: 'HomeController',
            link: function(scope, ele){
                // 在指令中使用rootScope
                var rootScope = $injector.get('$rootScope');
                var $navLi = $('.js-app-header').find('.navbar-nav li');
                var $navA = $navLi.find('a');
                // 刷新页面时保持选中状态
                var state = $state.current.name === 'home.land' ? 'home.landing' : $state.current.name;
                $navLi.removeClass('active');
                $navA.each(function () {
                    // 导航sref与当前状态相同，或者同属于一个父状态，则激活之
                    var sref = $(this).attr('ui-sref');
                    if (sref === state || rootScope.isRelativePage(sref, state)) {
                        // 激活顶部导航栏
                        $(this).parent().addClass('active');
                        var dropDown = $(this).parent().parent().parent();
                        if (dropDown.hasClass('dropdown')) {
                            dropDown.addClass('active');
                        }
                    }
                });
            }
        };
    })
    ;
    
});