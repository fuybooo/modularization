define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    var angular = require('angular');
    // 生成form表单
    /**
     * 根据json配置文件生成模板或者直接取模板内容
     */
    app
        .directive('scrollDisplay', function(){
            return {
                link: function(scope, ele){
                    $(ele).off('mouseenter.scroll').on('mouseenter.scroll', function(){
                        $(this).addClass('oa').removeClass('oh');
                    }).off('mouseleave.scroll').on('mouseleave.scroll', function(){
                        $(this).addClass('oh').removeClass('oa');
                    })
                }
            }
        })
        .directive('toggleList', function(){
            return {
                link: function(scope, ele){
                    $(ele).click(function(){
                        if($(this).next().is(':visible')){
                            $(this).next().slideUp();
                            $(this).parent().removeClass('catalog-open').addClass('catalog-close');
                        }else{
                            $(this).next().slideDown();
                            $(this).parent().removeClass('catalog-close').addClass('catalog-open');
                        }
                    });
                }
            }
        })
    ;

});