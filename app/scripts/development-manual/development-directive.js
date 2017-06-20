define(['require'],function(require) {
    var app = require('app');
    var $ = require('jquery');
    var angular = require('angular');


    // 临时存储所有的文档值
    var docArray = [];


    /**
     * 根据json配置文件生成模板或者直接取模板内容
     */
    app
        .directive('scrollDisplay', function () {
            return {
                link: function (scope, ele) {
                    $(ele).off('mouseenter.scroll').on('mouseenter.scroll', function () {
                        $(this).addClass('oa').removeClass('oh');
                    }).off('mouseleave.scroll').on('mouseleave.scroll', function () {
                        $(this).addClass('oh').removeClass('oa');
                    })
                }
            }
        })
        .directive('toggleList', function () {
            return {
                link: function (scope, ele) {
                    $(ele).click(function () {
                        if ($(this).next().is(':visible')) {
                            $(this).next().slideUp();
                            $(this).parent().removeClass('catalog-open').addClass('catalog-close');
                        } else {
                            $(this).next().slideDown();
                            $(this).parent().removeClass('catalog-close').addClass('catalog-open');
                        }
                    });
                }
            }
        })
        .directive('catalogEvent', function () {
            return {
                link: function (scope, ele, attrs) {
                    $(ele).on('click', 'a:not([toggle-list])', function () {
                        var getCatalogLevel = function (that) {
                            var catalogLevel = '';
                            // 通过层级/index位置获取元素所在位置
                            var p_li = $(that).parent();
                            var lastIndex = p_li.index() + 1;
                            var p_ul = p_li.parent();
                            if (p_ul.hasClass('cr')) {
                                catalogLevel = lastIndex;
                            } else if (p_ul.hasClass('cr2')) {
                                catalogLevel = p_ul.parent().index() + 1 + '.' + lastIndex;
                            } else if (p_ul.hasClass('cr3')) {
                                catalogLevel = p_ul.parent().parent().parent().index() + 1 + '.' + (p_ul.parent().index() + 1) + '.' + lastIndex;
                            }
                            return catalogLevel;
                        };
                        var setScrollTop = function(){
                            for(var i=0,l=docArray.length;i<l;i++) {
                                var item = docArray[i];
                                var contentLevel = getCatalogLevel(item);
                                if(contentLevel === catalogLevel){
                                    $('html body').animate({scrollTop: $(item)[0].offsetTop - 70}, 800);
                                }
                            }
                        };
                        var catalogLevel = getCatalogLevel(this);
                        if(docArray.length === 0){
                            $('.' + attrs.cls + ' h3,.' + attrs.cls + ' h4,.' + attrs.cls + ' h5').each(function () {
                                docArray.push(this);
                            });
                        }
                        setScrollTop();
                    })
                }
            }
        })
        .directive('returnTop', function(){
            return {
                link: function(scope, ele){
                    $(ele).off('click.fuybooo.returnTop').on('click.fuybooo.returnTop', function(){
                        $('html body').animate({scrollTop: 200}, 800);
                    });
                }
            };
        })
        .directive('findRules', function(){
            return {
                link: function(scope, ele){
                    $(ele).on('click', 'a', function(){
                        console.log(this);
                        $('html body').animate({scrollTop: $('#' + $(this).data().target)[0].offsetTop - 70}, 800);
                    })
                }
            }
        })
    ;

});