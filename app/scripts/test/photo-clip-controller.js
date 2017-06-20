define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.controller('PhotoClipController', function($rootScope,$scope, $state,$compile, commonService, dataService, Popupwin){
        console.log('PhotoClipController')

        $scope.selectPhoto = function(){
            $('#test-photo-file').click();
        }
    });

});