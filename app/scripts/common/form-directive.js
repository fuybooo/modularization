define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    var angular = require('angular');
    // 生成form表单
    app.directive('formGenerator', function (commonService) {
        return {
            template: function (tElement, tAttrs) {
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
                    console.log(templateData);
                    var formName = templateData.form.name;
                    var labelCol = templateData.form.labelCol;
                    var right_col = 12 - labelCol;
                    var formContentArr = [];
                    var genBtnItemHtml = function(){

                    };
                    angular.forEach(templateData.form.content, function (item) {
                        var ruleString = ' ';
                        var validArea = [];
                        var formContentItem = '';
                        switch (item.type) {
                            case 'text':
                            case 'password':
                                if (item.limitRules) {
                                    angular.forEach(item.limitRules, function (rule) {
                                        if (rule.type === 0) {
                                            // angular内置验证器
                                            if (rule.value === '') {
                                                // 不需要值，不需要值的验证器只支持required
                                                ruleString += rule.name + ' ';
                                            } else {
                                                // 需要值
                                                ruleString += 'ng-' + rule.name + '="' + rule.value + '" ';
                                            }
                                            validArea.push('<span ng-show="' + formName + '.' + item.name + '.$error.' + rule.name + '">' + rule.tip + '</span>');
                                        } else {
                                            // 自定义验证器
                                            if (rule.value === '') {
                                                // 不需要值
                                                ruleString += commonService.transformString(rule.name) + ' ';
                                            } else {
                                                // 需要值
                                                ruleString += commonService.transformString(rule.name) + '="' + rule.value + '" ';
                                            }
                                            validArea.push('<span ng-show="' + formName + '.' + item.name + '.$error.' + rule.name + '">' + rule.tip + '</span>');
                                        }
                                    });
                                }
                                formContentItem = '<div class="form-group">' +
                                    '<label ' + (item.id ? 'for="' + item.id + '"' : '') + ' class="col-sm-3 control-label">' + item.label + '</label>' +
                                    '<div class="col-sm-9">' +
                                    '<input type="' + item.type + '" name="' + item.name + '" ng-model="' + item.model + '" placeholder="' + item.placeholder + '"' +
                                    'class="form-control" ' + (item.id ? 'for="' + item.id + '"' : '') + ruleString + '>' +
                                    '<span class="text-danger"' +
                                    'ng-show="' + formName + '.' + item.name + '.$dirty && ' + formName + '.' + item.name + '.$invalid">' +
                                    validArea.join('') +
                                    '</span>' +
                                    '</div>' +
                                    '</div>';
                                formContentArr[item.sort] = formContentItem;
                                break;
                            case 'checkbox':
                                break;
                            case 'radio':
                                break;
                            case 'validateCode':
                                break;
                            case 'button':
                                formContentItem = '';
                                var btnItemHtml = '';
                                if(item.btns.length === 2){
                                    if(right_col / 2 === 0){
                                        btnItemHtml += '<div class="col-sm-offset-' + labelCol + ' col-sm-' + (right_col / 2 - 1) + '">' +
                                            '<button class="btn btn-primary btn-block" ng-disabled="' + formName + '.$invalid || ' + formName + '.$pristine">' +  + '</button>' +
                                            '</div>';
                                    }else{

                                    }
                                }


                                break;
                            default:
                                break;
                        }
                    });
                    var btnsHtml = '';
                    if (templateData.btns) {
                        for (var i = 0; i < templateData.btns.length; i++) {
                            btnsHtml += '<div class="form-group">' +
                            '<div class="col-sm-offset-3 col-sm-9">' +
                            '<button class="btn btn-primary btn-block" ng-disabled="register_form.$invalid">登录</button>' +
                            '</div>' +
                            '</div>';
                        }
                    }
                    var templateHtml = '<form class="form-horizontal" role="form" name="' + formName + '" novalidate>' +
                        formContentArr.join('') +
                        btnsHtml +
                        '</form>';
                    return templateHtml;
                }
            }
        };
    });

});