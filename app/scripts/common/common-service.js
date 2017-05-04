define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.factory('commonService', ['$timeout', function($timeout){
        var service = {};
        var timeout = null;
        /**
         * 弹出提示
         * @param text 提示文本，默认为操作成功，即不传任何参数时，弹出操作成功的提示
         * @param state 提示文本的样式，目前只支持 s：success， i：info， w：warning， d：danger，默认为s
         */
        service.alert = function(text, state){
            if(arguments.length === 0){
                text = '操作成功！';
                state = 's';
            }

            var cls = 'success';
            if(state === 's' || !state){
                cls = 'success';
            }else if(state === 'i'){
                cls = 'info';
            }else if(state === 'w'){
                cls = 'warning';
            }else if(state === 'd'){
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
    
        return service;
    }]);

});