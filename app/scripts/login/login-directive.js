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
        .directive('loginDirective', function () {
            return {
                scope: {
                    onClickLogin: '&'
                },
                controller: 'LoginController',
                link: function (scope, ele, attrs) {
                    console.log('loginDirective');
                    $(ele).click(function () {
                        scope.onClickLogin(scope.login);
                    });
                }
            }
        })
    ;
});