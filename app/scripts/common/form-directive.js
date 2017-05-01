define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.directive('form-element', function($state){
        return {
            link: function(scope,element,attrs){
                console.log('form-element.directive')
            }
        };
    });

});