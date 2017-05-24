define(function (require) {
    var app = require('app'),
        $ = require('jquery');
    app.directive('sliderList', function () {
        return {
            link: function(scope,ele,attrs){
                var liList = $(ele).find('li.fm-banner-slider-item');
                var i = 0;
                var length = liList.length;
                setInterval(function(){
                    $(liList[i]).fadeOut(600);
                    i = (i + 1) % length;
                    $(liList[i]).fadeIn(600);
                }, 3000);
                
                var prevBtn = $(ele).find('.fm-banner-slider-btn-prev');
                var nextBtn = $(ele).find('.fm-banner-slider-btn-next');
                
            }
        };
    })
    ;
});