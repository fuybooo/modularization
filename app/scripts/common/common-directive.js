define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    var angular = require('angular');
    // 生成form表单
    /**
     * 根据json配置文件生成模板或者直接取模板内容
     */
    app.directive('formGenerator', function (commonService) {
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
                                '<span class="text-danger"' +
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
     * 验证码控件指令，生成一个表单控件（只支持一个控件占一行的情况）
     */
        .directive('validateCodeControl', function () {
            return {
                replace: true,
                template: function (tElement, tAttrs) {
                    return '<div class="form-group">' +
                        '<label ' + (tAttrs.id ? 'for="' + tAttrs.id + '"' : '') + ' class="col-' + tAttrs.coltype + '-' + tAttrs.labelcol + ' control-label"><span class="c-red">*</span>验证码</label>' +
                        '<div class="col-' + tAttrs.coltype + '-' + tAttrs.rightcol + '">' +
                        '<input type="text" name="' + tAttrs.name + '" ng-model="' + tAttrs.model + '" placeholder="请输入验证码"' +
                        'class="form-control w_50 fl" ' + (tAttrs.id ? 'id="' + tAttrs.id + '"' : '') + 'required>' +
                        '<validate-code></validate-code>' +
                        '<span class="form-error-tip text-danger"' +
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
                link: function (scope, ele, attrs) {
                    // 点击刷新验证码
                    $(ele).click(function () {
                        $(this).replaceWith($compile('<validate-code></validate-code>')(scope));
                    });
                }
            }
        })
    ;
    
});