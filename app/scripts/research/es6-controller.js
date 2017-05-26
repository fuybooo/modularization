define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('ES6Controller', function (dataService) {
        dataService.get('es6');
    });
});