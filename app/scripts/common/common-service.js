define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.factory('commonService', function($timeout, $compile){
        var service = {};
        /**
         * 所有的正则
         */
        service.REGEXP = {
            username: /^[\u4E00-\u9FA5A-Za-z0-9\-_@\.\|\/]+$/ // 只能包含数字/英文/汉字/下划线/减号/@符号/点/竖杠/斜杠
        };
    
        /**
         * 所有的sessionStorage
         */
        service.SESSION = {
            userInfo: 'userInfo',
            localLanguage: 'localLanguage'
        };
        /**
         * 所有的事件
         */
        service.EVENT = {
            login: 'login'
        };
        /**
         * 所有的事件的值
         */
        service.EVENT_KEY = {
            success: 'success',
            logout: 'logout'
        };
        /**
         * 所有状态
         */
        service.STATUS = {
            NOT_LOGGED_IN: -1,
            SUCCESS: 0,
            ERROR: 1
        };

        // /**
        //  * language 多语言转换 translateLanguage
        //  * @type {null}
        //  */
        // service.TL = function(key){
        //     $translate.instant(key);
        // };
        
        var timeout = null;
        /**
         * 弹出提示
         * @param text 提示文本，默认为操作成功，即不传任何参数时，弹出操作成功的提示
         * @param state 提示文本的样式，目前只支持 s：success， i：info， w：warning， d：danger，默认为s
         */
        service.alert = function(text, state){
            if(arguments.length === 0){
                text = '操作成功！';
                state = 0;
            }

            var cls = 'success';
            if(state === 's' || state === undefined || state === 0){
                cls = 'success';
            }else if(state === 'i' || state === 2){
                cls = 'info';
            }else if(state === 'w' || state === 3){
                cls = 'warning';
            }else if(state === 'd' || state === 1){
                cls = 'danger';
            }else{
                cls = 'danger';
            }
            var alertDiv = $('.alert-global-tip');
            var allCls = 'alert-success alert-info alert-warning alert-danger';
            if(alertDiv.length !== 0){
                alertDiv.fadeIn(400).text(text).removeClass(allCls).addClass('alert-' + cls);
            }else{
                alertDiv = $('<div class="alert alert-' + cls + ' alert-global-tip" role="alert">' + text + '</div>').appendTo('body').fadeIn(400);
            }
            alertDiv.css('top', 100 + $('body').scrollTop());
            if(timeout){
                $timeout.cancel();
            }
            timeout = $timeout(function(){
                alertDiv.fadeOut(400, function(){
                    alertDiv.remove();
                });
            }, 1200);
            
        };

        /**
         * 字符串转换
         * @param str 需要被转换的字符串
         * @param type 转换的方式 默认为驼峰与中划线的互转，如 console.log(transformString('ss-bb')); // ssBb；console.log(transformString('ssBb')); // ss-bb
         */
        service.transformString = function(str, type){
            var string = '';
            if(typeof type === 'undefined'){
                var reg_upper_letter = /[A-Z]/;
                var reg_upper_letter_g = /[A-Z]/g;
                var reg_separator = /-/;
                var reg_separator_letter = /-[a-zA-Z]/;
                var reg_separator_letter_g = /-[a-zA-Z]/g;
                var upperIndex = str.search(reg_upper_letter); // 大写字母第一次出现的位置
                var separatorIndex = str.search(reg_separator); // 分隔符第一次出现的位置
                var transType = 1; // 转换方法为大写转分隔符
                if(upperIndex !== -1){
                    if(separatorIndex !== -1){
                        // 传入的字符串既包含大写字母，又包含分隔符，（不规范字符串）
                        if(upperIndex > separatorIndex){// 分隔符先出现
                            transType = 2;// 转换方法为分割符转大写
                        }
                    }
                }else{
                    if(separatorIndex !== -1){
                        transType = 2;// 转换方法为分割符转大写
                    }else {
                        return str;
                    }
                }
                var strSplitArr, strMatchArr;
                if(transType === 1){
                    // 大写转分隔符
                    strSplitArr = str.split(reg_upper_letter);// 以大写字母分割带转换字符串
                    strMatchArr = str.match(reg_upper_letter_g);// 匹配大写字母出现的具体情况
                    for(var i=0,l=strSplitArr.length;i<l;i++){
                        string += strSplitArr[i];
                        if(i !== l - 1){
                            string += '-' + strMatchArr[i].toLowerCase();
                        }
                    }
                    return string;
                }else{
                    // 分隔符转大写
                    strSplitArr = str.split(reg_separator_letter);
                    strMatchArr = str.match(reg_separator_letter_g);
                    for(var i=0,l=strSplitArr.length;i<l;i++){
                        string += strSplitArr[i];
                        if(i !== l - 1){
                            string += strMatchArr[i].slice(1).toUpperCase();
                        }
                    }
                    return string;
                }
            }else{
                // 其他转换方式
            }

            return string || str;
        };
    
        /**
         * 生成验证码
         */
        service.getValidateCode = function(){
            var VALIDATE_LENGTH = 6;
            var arr_num = [1,2,3,4,5,6,7,8,9,0];
            var arr_lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            var arr_upper = arr_lower.map(function(i){
                return i.toUpperCase();
            });
            var arr = arr_num.concat(arr_lower).concat(arr_upper);
            var colors = ['muted', 'primary', 'success', 'info', 'warning', 'danger'];
            var code_span = '';
            var code = '';
            for(var i = 0; i< VALIDATE_LENGTH; i++){
                var code_i = arr[Math.floor(Math.random() * arr.length)];
                code += code_i;
                code_span += '<span class="w__1_6 text-center text-' + colors[Math.floor(Math.random() * colors.length)] + '">' +
                    code_i + '</span>';
            }
            service.validateCode = code;
            return '<span class="validate-code" title="换一张" ng-click="refreshValidateCode($event)">' + code_span + '</span>';
        };
    
        /**
         * 打开快速编辑界面
         */
        service.showQuickEdit = function(options){
            var removeEditPanel = function(){
                $('.js-edit-panel').remove();
            };
            var $editPanel = $('<div class="js-edit-panel edit-panel">' +
                '<div class="edit-panel-title bg-info">' +
                (options.title || '修改') +
                '<span class="js-edit-panel-close edit-panel-close">&#215;</span>' +
                '</div>' +
                '<div class="edit-panel-body">' +
                '<form name="' + options.field + '_form">' +
                    // 根据不同的type生成不同的输入框类型
                '<input type="text" class="form-control" ng-model="' + options.field + '" name="' + options.field + '" ng-init="' + options.field + '=\'' + options.value + '\'">' +
                '</form>' +
                '</div>' +
                '<div class="edit-panel-footer">' +
                '<button class="btn btn-primary btn-sm js-sure-edit" ng-disabled="' + options.field + '_form.$pristine || ' +  options.field + '_form.$invalid' + '">确定</button>' +
                '</div>' +
                '</div>');
            var target = options.target;
            target.append($compile($editPanel)(options.scope));
            $('.js-edit-panel-close').off('click.close').on('click.close', function(e){
                e.stopPropagation();
                removeEditPanel();
                target.parent().removeClass('show');
            });
            $(document).off('click.close.editPanel').on('click.close.editPanel', function(e){
                if($('.js-edit-panel').length > 0 && !$.contains($('.js-edit-panel')[0], e.target)){
                    removeEditPanel();
                    // 如果鼠标单击的是显示图标的td,或者是td内的元素,则不执行消失
                    if(!(target.parent()[0] === e.target || (target.parent()[0] !== e.target && $.contains(target.parent()[0], e.target)))){
                        target.parent().removeClass('show');
                    }
                }
            });
            $('.js-sure-edit').off('click.sure.edit').on('click.sure.edit', options.ok);
        };
        /**
         * 查找指定父节点
         * @param ele 元素 dom对象
         * @param nodeName 指定元素名称
         * @desc 比如在如下结构中：<form><div><div><input>,查找input元素的父级form元素var form = findParentNode(inputElement, 'form');
         */
        service.findParentNode = function(ele, nodeName){
            var parent = ele.parentNode;
            if(!parent) return null;
            if(parent.nodeName.toLowerCase() === nodeName.toLowerCase()){
                return parent;
            }else{
                return service.findParentNode(parent, nodeName);
            }
        };
    
    
        return service;
    });

});