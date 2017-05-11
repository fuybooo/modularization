define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    /**
     * 显示table1
     */
    app.directive('adminMenu', function ($state) {
        return {
            templateUrl: 'app/views/admin/admin-menu.html'
        }
    })
    ;
});