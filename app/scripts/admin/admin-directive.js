define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    /**
     * admin menu
     */
    app.directive('adminMenu', function ($state) {
        return {
            replace: true,
            controller: 'AdminMenuController',
            templateUrl: '/app/views/admin/admin-menu.html',
            link: function (scope, ele, attrs) {
                $(ele).find('li').removeClass('active').each(function () {
                    if ($(this).attr('ui-sref') === $state.current.name) {
                        $(this).addClass('active');
                    }
                });
                $(ele).find('a').off('click.admin.menu').on('click.admin.menu', function () {
                    if ($(this).parent().hasClass('active')) {
                        return;
                    }
                    if ($(this).hasClass('js-dropdown-a')) {
                        if ($(this).parent().toggleClass('open'));
                    } else {
                        $(ele).find('li').removeClass('active');
                        $(this).parent().addClass('active');
                    }
                });
            }
        }
    })
    /**
     * 当前位置
     */
        .directive('currentPlace', function () {
            return {
                template: '<span class="current-place"><span class="little-strip"></span>{{currentPlaceString}}</span>',
                controller: function ($rootScope, $scope, $state) {
                    $scope.currentPlaceString = $rootScope.titleNameMap[$state.current.name];
                }
            }
        })
        /**
         * bootstrap-table可编辑的列
         */
        .directive('btColEditable', function(commonService,dataService){
            return {
                template: function(tEle, tAttrs){
                    return '<span class="js-cell-value">' + tAttrs.value + '</span><span class="glyphicon glyphicon-pencil js-edit"></span>';
                },
                link: function(scope, ele, attrs){
                    $(ele).parent().mouseover(function(){
                        $(this).addClass('show');
                    }).mouseleave(function(){
                        $(this).removeClass('show');
                    }).find('.js-edit').click(function(e){
                        if($('.js-edit-panel').length !== 0){
                            $('.js-edit-panel').remove();
                            return;
                        }
                        e.stopPropagation();
                        var $span = $(e.target).parent();
                        var $td = $span.parent();
                        var $tr = $td.parent();
                        var $table = $tr.parent().parent();
                        var $th = $table.find('thead tr th:nth-of-type(' + ($td.index() + 1) + ')');
                        var field = $th.data().field;
                        var title = $th.find('.th-inner').text();
                        var id = $span.data().id;
                        var value = $span.data().value;
                        var url = $table.data().editUrl;
                        commonService.showQuickEdit({
                            scope: scope,
                            field: field,
                            target: $span,
                            title: title,
                            value: value,
                            ok: function(){
                                var newValue = scope[field];
                                dataService.quickEdit(url,{
                                    action: 'quickEdit',
                                    id: id,
                                    field: field,
                                    value: newValue
                                }, function(res){
                                    commonService.alert(res.msg, res.code ? 'd' : 's');
                                    if(res.code === 0){
                                        $('.js-edit-panel').remove();
                                        $td.removeClass('show');
                                        // 方案一: 直接刷新整个列表 -- 浪费资源比较大,但是比较容易实现,也不会出错
                                        // 方案二: 替换掉要修改的值 -- 前台页面使用之前请求到的数据的时候,值时脏值 -- 需要进行同步更新
                                        $span.find('.js-cell-value').text(newValue);
                                        // 同步数据,以防万一使用的时候会出现脏数据
                                        scope.updateRow($tr.data().index, field, newValue);
                                    }
                                });
                            }
                        });
                    });
                    
                }
            }
        })
        .directive('uniqueTitle', function($timeout, dataService){
            return {
                require: 'ngModel',
                link: function(scope, ele, attrs, c){
                    var timeout = null;
                    scope.$watch(attrs.ngModel, function(n){
                        if(!n) return;
                        if(timeout){
                            $timeout.cancel();
                        }
                        timeout = $timeout(function(){
                            dataService.get(dataService.url.topic, {value:c.$modelValue, action: 'validateUniqueTitle'}, function(res){
                                c.$setValidity('uniqueTitle', res.code === 0);
                            });
                        }, 300);
                    });

                }
            };
        })
    ;
});