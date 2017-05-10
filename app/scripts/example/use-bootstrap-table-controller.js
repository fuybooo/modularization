define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('UseBootstrapTableController', function ($scope, dataService) {
        console.log('UseBootstrapTableController');
        var $table1 = $('#bt-ex-1');
        var renderTable = function(){
            dataService.getStudentsScores(function(res){
                $table1.bootstrapTable('load', res.data);
            });
        };
        renderTable();

    });
});