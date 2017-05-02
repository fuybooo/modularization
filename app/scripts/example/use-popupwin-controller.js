define(function (require) {
    var app = require('app');
    app.controller('UsePopupwinController', function ($scope, Popupwin) {
        /**
         * 弹出提示框
         */

        $scope.popTip = function () {
            Popupwin.create();
        };
        $scope.popString = function () {
            Popupwin.create('操作成功了哦！');
        };
        $scope.popConfirm = function () {
            Popupwin.create(function () {
                alert('执行删除操作！');
            });
        };
        $scope.popConfirmUpload = function () {
            Popupwin.create({
                text: '您确定上传吗？',
                textCls: 'text-danger',
                ok: function () {// 使用空格会触发该事件
                    alert('执行上传操作！');
                }
            });
        };
        $scope.popHtml = function () {
            Popupwin.create({
                title: '填写信息', // 弹出层标题
                isOkOnly: false, // 显示取消按钮
                okBtnText: '保存', // 执行ok事件的按钮名称，默认是确定
                okBtnCls: 'btn-success', // 为ok按钮添加样式
                closeBtnText: '不保存', // 默认是取消
                closeBtnCls: 'btn-danger', // 为close按钮添加样式
                html: '<input type="text" class="form-control" placeholder="请输入名称">',
                ok: function () {
                    alert('执行操作！');
                },
                close: function () { // 一般情况都执行默认的关闭操作，不需要写这个方法，这里只是演示
                    alert('执行取消操作');
                }
            });
        };
        $scope.popNotAutoClose = function () {
            var win = Popupwin.create({ // 声明一个弹出层变量，在多个弹出层弹出时，可以使用，如果只有一个弹出层，则无需声明
                title: '填写信息', // 弹出层标题
                isOkOnly: false, // 显示取消按钮
                okBtnText: '保存', // 执行ok事件的按钮名称，默认是确定
                okBtnCls: 'btn-success', // 为ok按钮添加样式
                closeBtnText: '不保存', // 默认是取消
                closeBtnCls: 'btn-danger', // 为close按钮添加样式
                cls: 'popupwin-info', // 为弹出层添加类名，以便以后使用
                html: '<input type="text" class="form-control" placeholder="请输入名称">',// 显示在弹出层中的html内容
                // ========================================
                closeWinAfterOk: false, // 执行ok事件后不自动关闭
                closeWinAfterClose: false, // 执行close事件后不自动关闭
                // ========================================
                ok: function () {
                    alert('执行操作！');
                    setTimeout(function () {// setTimeout为了看出关闭方法是手动执行的
                        Popupwin.close();// 无需声明变量，直接关闭弹出层，但是关闭的是最上层的弹出层，如果在此操作之前，需要再次弹出一个弹出层，则慎用
                    }, 1000);
                },
                close: function () { // 一般情况都执行默认的关闭操作，不需要写这个方法，这里只是演示
                    alert('执行取消操作');
                    setTimeout(function () {// setTimeout为了看出关闭方法是手动执行的
                        win.close(); // 需要声明一个多余的变量,但稳定关闭当前弹出层
                    }, 1000);
                }
            });
        };
        $scope.popHtmlUrl = function () {
            Popupwin.create({
                htmlUrl: 'app/views/example/use-popupwin-ex-1.html',
                ok: function(){
                    alert($scope.info);// 没有传入scope，无法获得那个-model中的值
                }
            });
        };
        $scope.popHtmlUrlWithScope = function () {
            Popupwin.create({
                htmlUrl: 'app/views/example/use-popupwin-ex-1.html',
                scope: $scope,
                closeWinAfterOk: false,
                ok: function(){
                    if($scope.info){
                        alert($scope.info);// 传入了scope，可以获得值
                        Popupwin.close();
                    }else{
                        alert($scope.info);
                    }
                }
            });
        };
        $scope.popHtmlUrlUseSelfBtn = function () {
            Popupwin.create({
                htmlUrl: 'app/views/example/use-popupwin-ex-2.html',
                isFooter: false,
                scope: $scope
            });
            $scope.popEx = function(){
                alert($scope.info);
                Popupwin.close();// 关闭最上层的弹出层
            }
        };


    });
});