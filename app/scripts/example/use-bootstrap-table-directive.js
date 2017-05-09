define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    /**
     * 显示table1
     */
    app.directive('btEx1', function ($state) {
        return {
            link: function(scope, ele, attrs){
                $(ele).bootstrapTable({
                    columns: getBtEx1Columns(),
                    data: []
                });
            }
        }
    })
    ;

});