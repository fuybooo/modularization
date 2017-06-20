define(['require'],function(require) {
    var app = require('app');
    var $ = require('jquery');
    var angular = require('angular');

    app
    /**
     * 根据json配置文件生成模板或者直接取模板内容
     */
        .directive('formGenerator', function (commonService) {
            /**
             * 生成json模板或者通过html路径获取模板内容
             * @param tElement
             * @param tAttrs
             * @returns {*}
             */
            var template = function (tElement, tAttrs) {
                var i;
                var templateData = '';
                var templateType = tAttrs.url.slice(-4);
                // 同步获取模板数据
                $.ajax({
                    url: 'app/' + (templateType === 'json' ? 'json' : 'views') + '/' + tAttrs.url,
                    dataType: templateType,
                    async: false,
                    success: function (data) {
                        templateData = data;
                    }
                });
                if (templateType === 'html') {
                    return templateData;
                } else {
                    // 处理json
                    /**
                     * 解析可配置的json文件
                     * 1.根据项目需求配置每行显示的列数，form级别 < form内容级别
                     * 2.提示信息位置可配置，默认显示在输入框下方（不需要额外的样式），可配置在右侧显示（根据项目需求）
                     * 3.支持各种类型的表单控件，支持自定义表单控件（以指令方式配置）
                     * 4.目前只支持最多两个按钮，按钮样式可配置
                     * 5.支持各种验证器，angular默认验证器，自定义验证器（以指令方式配置）
                     */
                    var formName = templateData.form.name;
                    var labelCol = templateData.form.labelCol;
                    var rightCol = templateData.form.rightCol;
                    var btnOffsetCol = templateData.form.btnOffsetCol;
                    var colType = templateData.form.colType;
                    var formContentArr = [];
                    var genBtnItemHtml = function (btnItem) {
                        return '<div class="col-' + colType + '-offset-' + btnOffsetCol + ' col-' + colType + '-' + btnItem.btnCol + '">' +
                            '<button class="btn btn-primary btn-block" ng-click="' + btnItem.click + '" ng-disabled="' + formName + '.$invalid || ' + formName + '.$pristine">' + btnItem.value + '</button>' +
                            '</div>';
                    };
                    // 表单内容
                    angular.forEach(templateData.form.content, function (item) {
                        var ruleString = ' ';
                        var validArea = [];
                        var ngShowArr = [];
                        var _ngShowArr = [];
                        var formContentItem = '';
                        switch (item.type) {
                            case 'text':
                            case 'password':
                            case 'textarea':
                                if (item.limitRules) {
                                    // 验证规则
                                    angular.forEach(item.limitRules, function (rule) {
                                        _ngShowArr.push(formName + '.' + item.name + '.$error.' + rule.name);
                                        if (rule.type === 0) {
                                            // angular内置验证器
                                            if (rule.value === '') {
                                                // 不需要值，不需要值的验证器只支持required
                                                ruleString += rule.name + ' ';
                                            } else {
                                                // 需要值
                                                ruleString += 'ng-' + rule.name + '="' + rule.value + '" ';
                                            }
                                        } else {
                                            // 自定义验证器
                                            if (rule.value === '') {
                                                // 不需要值
                                                ruleString += commonService.transformString(rule.name) + ' ';
                                            } else {
                                                // 需要值
                                                ruleString += commonService.transformString(rule.name) + '="' + rule.value + '" ';
                                            }
                                        }
                                        validArea.push('<span ng-show="%%ngShow%%">' + item.label + rule.tip + '</span>');
                                    });
                                    // 处理ngShow,使得提示信息只显示一种
                                    var ngShow = '';
                                    for (i = 0; i < _ngShowArr.length; i++) {
                                        ngShow += '!' + _ngShowArr[i];
                                        if (i < _ngShowArr.length - 1) {
                                            ngShow += ' && ';
                                        }
                                    }
                                    for (i = 0; i < _ngShowArr.length; i++) {
                                        var _ngShow = ngShow;
                                        for (var j = i + 1; j < _ngShowArr.length; j++) {
                                            _ngShow = _ngShow.replace(' && !' + _ngShowArr[j], '');
                                        }
                                        ngShowArr[i] = _ngShow.replace('!' + _ngShowArr[i], _ngShowArr[i]);
                                    }
                                    for (i = 0; i < validArea.length; i++) {
                                        validArea[i] = validArea[i].replace('%%ngShow%%', ngShowArr[i]);
                                    }
                                }
                                var labelStart = '<input type="' + item.type + '" ';
                                var labelEnd = '">';
                                if (item.type === 'textarea') {
                                    labelStart = '<textarea';
                                    labelEnd = '></textarea>';
                                }
                                formContentItem = '<div class="form-group">' +
                                    '<label ' + (item.id ? 'for="' + item.id + '"' : '') + ' class="col-' + colType + '-' + labelCol + ' control-label">' + (item.required ? '<span class="c-red">*</span>' : '') + item.label + '</label>' +
                                    '<div class="col-' + colType + '-' + rightCol + '">' +
                                    labelStart + 'name="' + item.name + '" ng-model="' + item.model + '" placeholder="' + item.placeholder + item.label + '"' +
                                    'class="form-control" ' + (item.id ? 'id="' + item.id + '"' : '') + ruleString + labelEnd +
                                    '<span class="text-danger" ' +
                                    'ng-show="' + formName + '.' + item.name + '.$dirty && ' + formName + '.' + item.name + '.$invalid">' +
                                    validArea.join('') +
                                    '</span>' +
                                    '</div>' +
                                    '</div>';
                                formContentArr[item.sort] = formContentItem;
                                break;
                            case 'checkbox':
                            case 'radio':
                                var itemHtml = '';
                                for (i = 0; i < item.checkItems.length; i++) {
                                    var checkItem = item.checkItems[i];
                                    itemHtml += '<div class="' + item.type + '">' +
                                        '<input type="' + item.type + '" ng-model="' + checkItem.model + '" ' + (checkItem.required ? 'required' : '') + ' >' + checkItem.label +
                                        '</div>';
                                }
                                formContentItem = '<div class="form-group">' +
                                    '<div class="col-' + colType + '-offset-' + labelCol + ' col-' + colType + '-' + rightCol + '">' +
                                    itemHtml +
                                    '</div>' +
                                    '</div>';
                                formContentArr[item.sort] = formContentItem;
                                break;
                            case 'button':
                                var btnItemHtml = genBtnItemHtml(item.btns[0]);
                                if (item.btns.length === 2) {
                                    btnItemHtml += genBtnItemHtml(item.btns[1]);
                                }
                                formContentItem = '<div class="form-group">' + btnItemHtml + '</div>';
                                formContentArr[item.sort] = formContentItem;
                                break;
                            default:
                                // 将该配置项当做指令来处理
                                formContentItem = '<div ' +
                                    commonService.transformString(item.type) + ' ' +
                                    'data-formName="' + formName + '" ' +
                                    'data-labelCol="' + labelCol + '" ' +
                                    'data-rightCol="' + rightCol + '" ' +
                                    'data-btnOffsetCol="' + btnOffsetCol + '" ' +
                                    'data-colType="' + colType + '" ' +
                                    'data-sort="' + item.sort + '" ' +
                                    'data-name="' + item.name + '" ' +
                                    'data-model="' + item.model + '"' +
                                    ' ></div>';
                                formContentArr[item.sort] = formContentItem;
                                break;
                        }
                    });
                    return '<form class="form-horizontal" role="form" name="' + formName + '" novalidate>' +
                        formContentArr.join('') +
                        '</form>';
                }

            };
            return {
                template: template
            };
        })
        /**
         * 生成验证规则
         */
        .directive('validateGenerator', function (commonService) {
            return {
                replace: true,
                template: function (tEle, tAttr) {
                    // 获取生成验证规则的目标
                    var $target = tAttr.validateGenerator ? $('#' + tAttr.validateGenerator) : $(tEle).prev();
                    // 找到验证规则，自定义验证规则需要在span标签上写明：data-custom-validate="custom-a:已经存在,custom-b:包含敏感字"；以中划线拼接
                    var validates = [];
                    // 添加angular内置验证规则
                    var type = $target.attr('type');
                    if (type === 'email') {
                        validates.push({name: 'email', desc: '邮箱格式不正确'});
                    } else if (type === 'number') {
                        validates.push({name: 'number', desc: '数字格式不正确'});
                    } else if (type === 'url') {
                        validates.push({name: 'url', desc: 'url格式不正确'});
                    }
                    var ngValidates = [
                        {name: 'required', desc: '必填项不能为空'},
                        {name: 'ng-minlength', desc: '最少字符限制'},
                        {name: 'ng-maxlength', desc: '最大字符限制'},
                        {name: 'ng-pattern', desc: '输入不符合规范'}
                    ];
                    for (var i = 0, l = ngValidates.length; i < l; i++) {
                        var item = ngValidates[i];
                        if (item.name in $target[0].attributes) {
                            var suffix = '';
                            if (item.name === 'ng-minlength' || item.name === 'ng-maxlength') {
                                suffix = $target.attr(item.name) + '位';
                            }
                            validates.push({name: item.name.replace('ng-', ''), desc: item.desc + suffix});
                        }
                    }
                    // 添加自定义验证规则
                    validates = validates.concat(tAttr.customValidate ?
                        tAttr.customValidate.split(',').map(function (item) {
                            return {name: item.split(':')[0].trim(), desc: item.split(':')[1].trim()};
                        }).filter(function (item) {
                            return item.name in $target[0].attributes;
                        }).map(function (item) {
                            return {name: commonService.transformString(item.name), desc: item.desc};
                        }) : []);
                    // 获取formName
                    var formName = tAttr.form || $(commonService.findParentNode(tEle[0], 'form')).attr('name');
                    if (!formName) {
                        throw new Error('Cannot find form!');
                    }
                    var _ngShowArr = [];
                    var ngShowArr = [];
                    var validateHtml = [];
                    // 根据验证规则生成html
                    angular.forEach(validates, function (rule) {
                        _ngShowArr.push(formName + '.' + $target[0].name + '.$error.' + rule.name);
                        validateHtml.push('<span ng-show="%%ngShow%%">' + rule.desc + '</span>');
                    });
                    // 处理ngShow,使得提示信息只显示一种
                    var ngShow = '';
                    for (i = 0; i < _ngShowArr.length; i++) {
                        ngShow += '!' + _ngShowArr[i];
                        if (i < _ngShowArr.length - 1) {
                            ngShow += ' && ';
                        }
                    }
                    for (i = 0; i < _ngShowArr.length; i++) {
                        var _ngShow = ngShow;
                        for (var j = i + 1; j < _ngShowArr.length; j++) {
                            _ngShow = _ngShow.replace(' && !' + _ngShowArr[j], '');
                        }
                        ngShowArr[i] = _ngShow.replace('!' + _ngShowArr[i], _ngShowArr[i]);
                    }
                    for (i = 0; i < validateHtml.length; i++) {
                        validateHtml[i] = validateHtml[i].replace('%%ngShow%%', ngShowArr[i]);
                    }
                    return '<span ng-show="!' + formName + '.' + $target[0].name + '.$pristine &&!' + formName + '.' + $target[0].name + '.$valid" class="text-danger">' + validateHtml.join('') + '</span>';
                }
            }
        })
        /**
         * 验证码控件指令，生成一个表单控件（只支持一个控件占一行的情况）
         */
        .directive('validateCodeControl', function () {
            return {
                replace: true,
                template: function (tElement, tAttrs) {
                    return '<div class="form-group">' +
                        '<label ' + (tAttrs.id ? 'for="' + tAttrs.id + '"' : '') + ' class="col-' + tAttrs.coltype + '-' + tAttrs.labelcol + ' control-label"><span class="c-red">*</span>验证码</label>' +
                        '<div class="col-' + tAttrs.coltype + '-' + tAttrs.rightcol + '">' +
                        '<input type="text" name="' + tAttrs.name + '" ng-model="' + tAttrs.model + '" placeholder="请输入验证码" ' +
                        'class="form-control w_50 fl" ' + (tAttrs.id ? 'id="' + tAttrs.id + '"' : '') + 'required>' +
                        '<validate-code></validate-code>' +
                        '<span class="form-error-tip text-danger" ' +
                        'ng-show="' + tAttrs.formname + '.' + tAttrs.name + '.$dirty && ' + tAttrs.formname + '.' + tAttrs.name + '.$invalid">验证码不能为空</span>' +
                        '</div>' +
                        '</div>';
                }

            }
        })
        /**
         * 验证码指令
         */
        .directive('validateCode', function ($compile, commonService) {
            return {
                restrict: 'EA',
                replace: true,
                template: commonService.getValidateCode,
                link: function (scope, ele) {
                    // 点击刷新验证码
                    $(ele).click(function () {
                        $(this).replaceWith($compile('<validate-code></validate-code>')(scope));
                    });
                }
            }
        })
        /**
         * 评论模块
         */
        .directive('commentsModule', function () {
            return {
                templateUrl: 'app/views/comments-module.html',
                link: function (scope, ele) {

                }
            }
        })
        /**
         * 评论模块--发表评论
         */
        .directive('commentsModulePost', function () {
            return {
                templateUrl: 'app/views/comments-module-post.html',
                link: function (scope, ele) {

                }
            }
        })
        /**
         * 使文字渐变（兼容谷歌浏览器）
         */
        .directive('gradientText', function () {
            return {
                link: function (scope, ele, attrs) {
                    var MAX = attrs.level - 0 || 2;
                    var c = function () {
                        return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
                    };
                    var getBackgroundImage = function () {
                        if (MAX <= 2) {
                            return '-webkit-gradient(linear, left top, right bottom, from(' + c() + '), to(' + c() + '))';
                        }
                        var backgroundImage = '-webkit-linear-gradient(left, ';
                        for (var i = 0; i < MAX; i++) {
                            backgroundImage += c() + ' ' + i + (i === 0 ? '' : '0%');
                            if (i < MAX - 1) {
                                backgroundImage += ',';
                            } else {
                                backgroundImage += ')';
                            }
                        }
                        return backgroundImage;
                    };
                    $(ele).css('background-image', getBackgroundImage());
                }
            }
        })
        /**
         * 使文字渐变（兼容所有浏览器） --- 未完成
         */
        .directive('gradientTextNormal', function () {
            return {
                link: function (scope, ele) {
                    var textArray = $(ele).text();
                    var l = textArray.length;
                    var get256Num = function (number) {
                        return number % 256;
                    };
                    var c = function () {
                        return Math.floor(Math.random() * 256);
                    };
                    // 获取文字颜色数组
                    var colorArray = [];
                    for (var i = 0; i < l; i++) {
                        colorArray.push({
                            r: c(),
                            g: c(),
                            b: c()
                        });
                    }
                    var getGradientText = function () {
                        var spans = '';
                        for (var i = 0; i < l; i++) {
                            var t = textArray[i];
                            var color = colorArray[i];
                            spans += '<span style="color: rgb(' + get256Num(color.r) + ',' + get256Num(color.g) + ',' + get256Num(color.b) + ')">' + t + '</span>';
                        }
                        $(ele).html(spans);
                    };
                    getGradientText();

                }
            }
        })
        /**
         * 提示敏感字
         */
        .directive('sensitiveWord', function ($timeout, dataService) {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, c) {
                    var timeout = null;
                    scope.$watch(attrs.ngModel, function (n) {
                        if (!n)return;
                        if (timeout) $timeout.cancel();
                        timeout = $timeout(function () {
                            dataService.validateSensitiveWord(c.$modelValue, function (res) {
                                c.$setValidity('sensitiveWord', res.code === 0);
                            });
                        }, 300);
                    })
                }
            }
        })
        /**
         *使按钮点击之后禁用2秒，防止多次点击
         */
        .directive('disabledAfterClick', function ($timeout) {
            return {
                link: function (scope, ele) {
                    $(ele).off('click.dac').on('click.dac', function () {
                        $(ele).prop('disabled', true);
                        $timeout(function () {
                            $(ele).prop('disabled', false);
                        }, 2000);
                    });
                }
            };
        })
        /**
         * 手动编译变量中的html
         *
         * compileBindHtml指令对应的值为需要编译的html
         * 如：
         * -- html --
         * <div compile-bind-html="{{htmlContent}}"></div>
         * -- js --
         * $scope.htmlContent = '<div class="text-center">居中显示</div>';
         * 如果没有使用compile-bind-html指令，则显示的内容为一段html代码即会将div标签也显示出来，使用之后，代码会正常显示
         *
         */
        .directive('compileBindHtml', function ($compile) {
            return {
                link: function (scope, ele, attrs) {
                    scope.$watch("::" + attrs.compileBindHtml, function (html) {
                        if (html && html.indexOf("<") !== -1 && html.indexOf(">") !== -1) {
                            var linker = $compile(html);
                            linker(scope, function (clone) {
                                ele.empty();
                                ele.append(clone);
                            });
                        } else {
                            ele.empty();
                            ele.append(html);
                        }
                    });
                }
            };
        })
        /**
         * ng-repeat完成之后发送事件
         * <tr ng-repeat="t in texts track by $index" repeat-finish="test-es-texts">
         */
        .directive('repeatFinish', function($timeout){
            return {
                link: function (scope, ele, attrs) {
                    if(scope.$last){
                        $timeout(function(){
                            scope.$emit(attrs.repeatFinish);
                        });
                    }
                }
            }
        })
    ;

});