define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('DevelopmentController', function ($rootScope, $scope, $location,$anchorScroll) {
        console.log('DevelopmentController');
        
        
        $(window).on('scroll.fuybooo.dev', function(){
            var sideOffsetTop = $('.dev-manual')[0].offsetTop - $(document).scrollTop();
            if(sideOffsetTop < 70){
                $('.dev-side').addClass('pf t70');
                $('.js-dev-return-top').removeClass('dn');
            }else{
                $('.dev-side').removeClass('pf t70');
                $('.js-dev-return-top').addClass('dn');
            }
        })
    });
});