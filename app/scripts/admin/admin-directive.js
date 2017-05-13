define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    /**
     * 显示table1
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
                
                $(ele).find('a').click(function () {
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
        .directive('currentPlace', function () {
            return {
                template: '<span class="current-place"><span class="little-strip"></span>{{currentPlaceString}}</span>',
                controller: function ($rootScope, $scope, $state) {
                    $scope.currentPlaceString = $rootScope.titleNameMap[$state.current.name];
                }
            }
        })
    ;
});