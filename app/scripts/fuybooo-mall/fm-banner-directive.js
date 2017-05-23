define(function (require) {
    var app = require('app'),
        $ = require('jquery');
    app.directive('sliderList', function () {
        console.log('====================sliderListDirective')
        return {
            link: function(scope,ele,attrs){
                var liList = $(ele).find('li');
                var i = 0;
                var length = liList.length;
                setInterval(function(){
                    $(liList[i]).fadeOut(600);
                    i = (i + 1) % length;
                    $(liList[i]).fadeIn(600);
                }, 3000);
            }
        };
    })
    ;
});