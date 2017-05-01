define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.directive('popLogin', function($state){
        console.log('$state', $state);
        return {
            link: function(scope,element,attrs){
                console.log('scope', scope);
                console.log('element', element);
                console.log('attrs', attrs);
                $(element).click(function(){
                    $state.go('login');
                });
            }
        };
    });

});