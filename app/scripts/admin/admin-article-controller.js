define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('AdminArticleController', function ($rootScope, $scope, $state) {
        console.log('AdminArticleController');
        // $('.admin-menu .home-li').click();
        $scope.addArticle = function(){
            $state.go('home.admin.articleDetail', {
                flag: 'add'
            });
        };
    });
});