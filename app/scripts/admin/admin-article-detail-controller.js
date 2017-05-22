define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminArticleDetailController', function ($rootScope, $scope, $stateParams) {
        console.log('AdminArticleDetailController');
        // $('.admin-menu .home-li').click();
        if($stateParams.flag === 'add'){
            $scope.subTitle = '新增文章';
        }
    });
});