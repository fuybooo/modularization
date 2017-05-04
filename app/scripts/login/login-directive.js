define(function (require) {
    var app = require('app'),
        $ = require('jquery');
    app.directive('loginBox', function () {
        return {
            templateUrl: '/app/views/login-box.html',
            replace: true,
            scope: {}
        };
    })
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
                controller: 'LoginController',
                template: commonService.getValidateCode
            }
        })
    ;
});