define(function (require) {
    var app = require('app'),
        $ = require('jquery');
    app.directive('registerBox', function () {
        return {
            templateUrl: '/app/views/register-box.html',
            replace: true,
            scope: {}
        };
    })
    ;
});