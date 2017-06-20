define(['require'],function(require) {
    var app = require('app'),
        $ = require('jquery');
    app.directive('sliderList', function () {
        return {
            link: function(scope,ele,attrs){
                var liList = $(ele).find('li.fm-banner-slider-item');
                var prevBtn = $(ele).find('.fm-banner-slider-btn-prev');
                var nextBtn = $(ele).find('.fm-banner-slider-btn-next');
                var indicators = $(ele).find('.fm-banner-slider-indicator-item');
                var i = 0;
                var length = liList.length;
                var nextIndex = function(){
                    var step = arguments[0];
                    // 显示下一张图 ,即 + 1
                    if(step === undefined){
                        i = (i + 1) % length;
                    }else if(step === -1){
                        // 显示前一张图, 即 - 1
                        if(i !== 0){
                            i = i - 1;
                        }else{
                            i = length - 1;
                        }
                    }else{
                        // 调到指定的图
                        i = step;
                    }
                    $(indicators[i]).addClass('active').siblings().removeClass('active');
                };
                var sliderImages = function(){
                    $(liList[i]).fadeOut(600);
                    nextIndex(arguments[0]);
                    $(liList[i]).fadeIn(600);
                };
                var intervalId = setInterval(sliderImages, 3000);
                var slide = function(){
                    clearInterval(intervalId);
                    sliderImages(arguments[0]);
                    intervalId = setInterval(sliderImages, 3000);
                };
                prevBtn.click(function(){
                    slide(-1);
                });
                nextBtn.click(function(){
                    slide();
                });
                indicators.mouseenter(function(){
                    slide($(this).index());
                });
            }
        };
    })
    ;
});