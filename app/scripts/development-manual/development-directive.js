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
        .directive('catalogEvent', function(){
            return {
                link: function(scope, ele, attrs){
                    $(ele).on('click', 'a:not([toggle-list])', function(){
    
                        var catalogLevel = '';
                        // 通过层级/index位置获取元素所在位置
                        var p_li = $(this).parent();
                        var lastIndex = p_li.index() + 1;
                        var p_ul = p_li.parent();
                        if(p_ul.hasClass('cr')){
                            catalogLevel = lastIndex;
                        }
                        if(p_ul.hasClass('cr2')){
                            catalogLevel = p_ul.parent().index() + 1 + '.' + lastIndex;
                        }
                        if(p_ul.hasClass('cr3')){
                            catalogLevel = p_ul.parent().parent().parent().index() + 1 + '.' + (p_ul.parent().index() + 1) + '.' + lastIndex;
                        }
                        console.log(catalogLevel);
                        
                        $('.' + attrs.cls + ' h3,.' + attrs.cls + ' h4,.' + attrs.cls + ' h5').forEach(function(){
                            
                        })
                    })
                }
            }
        })
    ;

});