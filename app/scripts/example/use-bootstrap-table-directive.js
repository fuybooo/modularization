define(function(require) {
    var app = require('app');
    var $ = require('jquery');
    /**
     * 显示table1
     */
    app.directive('btEx1', function ($state) {
        return {
            link: function(scope, ele, attrs){
                $(ele).bootstrapTable({
                    striped: true, // 是否显示隔行变色
                    columns: getBtEx1Columns()
                });
            }
        }
    })
    ;
    
    function getBtEx1Columns(){
        return [
            {
                checkbox:true
            },
            {
                field: 'sort',
                title: '名次',
                sortable: true
            },
            {
                field: 'id',
                title: '编号',
                sortable: true
            },
            {
                field: 'name',
                title: '姓名',
                sortable: true
            },
            {
                field: 'math',
                title: '数学',
                sortable: true
            },
            {
                field: 'chinese',
                title: '语文',
                sortable: true
            },
            {
                field: 'english',
                title: '英语',
                sortable: true
            },
            {
                field: 'liZong',
                title: '理综',
                sortable: true
            },
            {
                field: 'wenZong',
                title: '文综',
                sortable: true
            }
            
        ];
        
    }
});