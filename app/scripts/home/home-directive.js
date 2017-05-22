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
            controller: 'HomeController'
        };
    })
    ;
    
});