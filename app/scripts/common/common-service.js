define(function(require){
    var app = require('app');
    var $ = require('jquery');
    app.factory('commonService', ['$timeout', function($timeout){
        var service = {};
        var timeout = null;
        service.alert = function(text, state){
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
        return service;
    }]);

});