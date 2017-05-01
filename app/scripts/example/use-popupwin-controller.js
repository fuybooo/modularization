define(function(require){
    var app = require('app');
    app.controller('UsePopupwinController', function($scope, popupwin){
        /**
         * 弹出提示框
         */
        
        $scope.popTip = function(){
            popupwin.create();
        };
    });
});