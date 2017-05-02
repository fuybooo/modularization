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
                // 给导航栏上的元素绑定事件, 实际上这个事件不需要写,只要在url跳转时加上active即可
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
    
    /**
     * pop-login
     * 功能:弹出登录界面
     */
        .directive('popLogin', function (Popupwin) {
            return {
                controller: 'LoginController',
                link: function (scope, element, attrs) {
                    $(element).click(function () {
                        Popupwin.create({
                            title: '登录',
                            scope: scope, // 需要使用$compile编译html
                            isFooter: false, // 不需要弹出层自带的按钮
                            htmlUrl: 'app/views/login-box.html'
                        });
                    });
                }
            };
        })
        .directive('validateCode', function (commonService) {
            return {
                restrict: 'EA',
                replace: true,
                template: function(){
                    var VALIDATE_LENGTH = 6;
                    var arr_num = [1,2,3,4,5,6,7,8,9,0];
                    var arr_lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                    var arr_upper = arr_lower.map(function(i){
                        return i.toUpperCase();
                    });
                    var arr = arr_num.concat(arr_lower).concat(arr_upper);
                    var colors = ['muted', 'primary', 'success', 'info', 'warning', 'danger'];
                    var code_span = '';
                    var code = '';
                    for(var i = 0; i< VALIDATE_LENGTH; i++){
                        var code_i = arr[Math.floor(Math.random() * arr.length)];
                        code += code_i;
                        code_span += '<span class="w__1_6 text-center text-' + colors[Math.floor(Math.random() * colors.length)] + '">' +
                            code_i + '</span>';
                    }
                    commonService.validateCode = code;
                    return '<span class="validate-code">' + code_span + '</span>';
                }
            }
        })
    ;
    
});