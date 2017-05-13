define(function (require) {
    var app = require('app'),
        $ = require('jquery');
    var i = 0;
    app.directive('loginBox', function () {
        return {
            templateUrl: '/app/views/login-box.html',
            replace: true,
            scope: {}
        };
    })
        .directive('popLogin', function (Popupwin) {
            return {
                link: function (scope, element, attrs) {
                    $(element).click(function () {
                        Popupwin.create({
                            title: '登录',
                            scope: scope, // 需要使用$compile编译html
                            isFooter: false, // 不需要弹出层自带的按钮
                            htmlUrl: 'app/views/login-box.html'
                        });
                    });
                }
            };
        })
        .directive('popEditUser', function (Popupwin, dataService) {
            return {
                link: function (scope, element, attrs) {
                    $(element).click(function () {
                        Popupwin.create({
                            title: '修改资料',
                            scope: scope,
                            htmlUrl: 'app/views/admin/admin-user-info.html',
                            ok: function () {
                            }
                        });
                    });
                }
            };
        })
        .directive('popLogout', function (Popupwin, dataService, commonService) {
            return {
                link: function (scope, element, attrs) {
                    $(element).click(function () {
                        Popupwin.create({
                            text: '您确定退出吗?',
                            ok: function () {
                                dataService.doLogout();
                                sessionStorage.clear();
                                scope.$emit(commonService.EVENT.login, commonService.EVENT_KEY.logout);
                            }
                        });
                    });
                }
            };
        })
        .directive('popAddUser', function (Popupwin, dataService, commonService) {
            return {
                link: function (scope, element, attrs) {
                    $(element).click(function () {
                        Popupwin.create({
                            title: '录入用户',
                            htmlUrl: 'app/views/admin/admin-user-info.html',
                            scope: scope,
                            controller: 'AddUserController',
                            closeWinAfterOk: false,
                            ok: function () {
                                dataService.handleUser(scope.userInfo, function (res) {
                                    commonService.alert(res.msg, res.code ? 'd' : 's');
                                });
                            }
                        });
                    });
                }
            };
        })
    ;
});