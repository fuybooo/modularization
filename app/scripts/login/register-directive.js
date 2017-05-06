define(function (require) {
    var app = require('app'),
        $ = require('jquery');
    /**
     * 显示一个注册区域
     */
    app
        .directive('registerBox', function () {
            return {
                templateUrl: '/app/views/register-box.html',
                replace: true,
                scope: {}
            };
        })
        /**
         * 点击弹出注册框
         */
        .directive('popRegister', function (Popupwin) {
            return {
                // controller:'RegisterController',
                link: function (scope, element, attrs) {
                    $(element).click(function () {
                        Popupwin.create({
                            title: '注册',
                            width: 400,// 一般不使用此参数控制弹框大小，而是使用模板中的样式去控制
                            scope: scope, // 需要使用$compile编译html
                            isFooter: false, // 不需要弹出层自带的按钮
                            // htmlUrl: 'app/views/register-box.html'
                            html: '<div ng-controller="RegisterController" form-generator data-url="register-form.json"></div>'// 使用表单生成指令生成register表单
                        });
                    });
                }
            };
        })
        /**
         * 注册用户名的唯一验证
         */
        .directive('registerUsernameUnique', function ($timeout, dataService) {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, c) {
                    var timeout = null;
                    scope.$watch(attrs.ngModel, function (n) {
                        if (!n) {
                            return;
                        }
                        if (timeout) {
                            $timeout.cancel();
                        }
                        timeout = $timeout(function () {
                            dataService.getUsers({
                                username: c.$modelValue
                            }, function (res) {
                                if (res.code === 0) {
                                    // 查到用户信息，验证不通过，提示用户已被注册
                                    c.$setValidity('registerUsernameUnique', false);
                                } else {
                                    c.$setValidity('registerUsernameUnique', true);
                                }
                            });
                        }, 300);
                    })
                }
            };
        })
        /**
         * 注册用户名的规范验证
         */
        .directive('registerUsernameRules', function ($timeout, commonService) {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, c) {
                    var timeout = null;
                    scope.$watch(attrs.ngModel, function (n) {
                        if (!n) {
                            return;
                        }
                        if (timeout) {
                            $timeout.cancel();
                        }
                        timeout = $timeout(function () {
                            if (commonService.REGEXP.username.test(n)) {
                                c.$setValidity('registerUsernameRules', true);
                            } else {
                                c.$setValidity('registerUsernameRules', false);
                            }
                        }, 300);
                    })
                }
            };
        })
    ;
});