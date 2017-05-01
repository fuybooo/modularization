/**
 * 弹出层插件
 * @author fuyb
 * @date 2017-04-15
 *
 * 使用方法：
 *  var pop = require('popupwin');
 *  var registPop = pop.create({
 *                      title: '注册',
 *                      htmlUrl: 'regist',
 *                      html: '<..>'
 *                      cls: 'regist',
 *                      width: 600,
 *                      isOkOnly: true,
 *                      okBtnText: '注      册',
 *                      ok: function(){
 *                          alert(1);
 *                      }
 *                      
 *                  });
 *
 */
define(function (require) {
    var $ = require('jquery');
    var app = require('app');
    
    
    app.factory('popupwin', function ($http, $compile) {
        /**
         * 弹出层
         * @param {Object} option 配置项
         */
        var PopupWin = function (option) {
            this.option = option;
            this.init();
        };
        /**
         * 默认配置项
         */
        var DEF = {
            isMask: true, // 是否启动遮罩层
            isKeyboard: true, // 是否启动快捷键 ESC为关闭，空格为确认执行当前选中的按钮，默认会选中确认，只有一个按钮是选中一个按钮
            zIndex: 200, // 在文档流上的位置，如果需要较高位置可以配置
            animation: 'none', // 动画效果： 'none':无效果, 'fade': 渐渐的出来 , 'top': 上边, 'right': 右边, 'bottom': 下边, 'left': 左边, 'random': 随机
            animationTime: 400, // 动画效果的时间
            okBtnText: '确定', // 执行ok事件按钮的文本
            closeBtnText: '取消', // 执行取消事件按钮的文本
            cls: '', // 弹出层的类名
            isOkOnly: false, // 只有确定按钮
            isCancelOnly: false, // 只有取消按钮
            title: '温馨提示', // 弹出窗标题
            top: 100,
            width: 400
        };
        PopupWin._count = 0;
        /**
         * 创建遮罩层，调用时不需要显示使用new关键字
         * @param {Object} option
         */
        PopupWin.create = function (option) {
            
            PopupWin._count++;
            return new PopupWin(option);
        };
        
        /**
         * 初始化插件
         */
        PopupWin.prototype.init = function () {
            // 合并默认条件
            this.option = $.extend(DEF, this.option);
            this.initContainer();
            this.initPopupwin();
            // this.initEvent();
            
        };
        PopupWin.prototype.initContainer = function () {
            var cls = this.option.cls;
            if (cls === '') {
                cls = 'popup-win-' + PopupWin._count;
            } else {
                /* 查看当前class是否已经存在，若存在，则修改cls */
                var allPopupwins = $('.popupwin');
                for (var i = 0, l = allPopupwins.length; i < l; i++) {
                    if ($(allPopupwins[i]).hasClass('pw-' + cls)) {
                        cls = cls + PopupWin._count;
                        break;
                    }
                }
            }
            this.$pop = $([
                // 遮罩层
                '<div class="popupwin-bg pw-bg-' + cls + '"></div>',
                // 弹出层
                '<div class="popupwin pw-' + cls + '">',
                // 头部
                '<div class="pw-header">',
                // 标题
                '<span class="pw-title">系统提示</span>',
                // 关闭
                '<span class="pw-close pw-js-close">&#215;</span>',
                '</div>',
                // 身体
                '<div class="pw-body">',
                '</div>',
                // 底部
                '<div class="pw-footer text-right">',
                // 取消
                '<button class="btn btn-primary btn-sm pw-btn-close pw-js-close">取消</button>',
                // 确定
                '<button class="btn btn-primary btn-sm pw-btn-ok pw-js-ok">确定</button>',
                '</div>',
                '</div>'
            ].join(''));
            this.$bg = $(this.$pop[0]);
            this.$container = $(this.$pop[1]);
            this.$title = this.$container.find('.pw-title');
            this.$close = this.$container.find('.pw-js-close');
            this.$body = this.$container.find('.pw-body');
            this.$okBtn = this.$container.find('.pw-btn-ok');
            this.$closeBtn = this.$container.find('.pw-btn-close');
            if (this.option.isOkOnly) {
                this.$closeBtn.hide();
            } else if (this.option.isCancelOnly) {
                this.$okBtn.hide();
            }
        };
        PopupWin.prototype.initEvent = function () {
            var that = this;
            this.$close.off('click.pw').on('click.pw', $.proxy(this.closeEvent, this));
            this.$okBtn.off('click.pw').on('click.pw', $.proxy(this.okEvent, this));
            if (this.option.isKeyboard) {
                $('body').off('keydown.pw').on('keydown.pw', function (e) {
                    var $allPopupwin = $('.popupwin:visible');
                    var shown_count = $allPopupwin.length;
                    if (shown_count !== 0) {
                        var $maxReveal = $($allPopupwin[0]);
                        for (var i = 1; i < shown_count; i++) {
                            if ($($allPopupwin[i]).css('z-index') - 0 > $maxReveal.css('z-index') - 0) {
                                $maxReveal = $($allPopupwin[i]);
                            }
                        }
                        var key = e.which || e.keyCode;
                        if (key === 27) {
                            $maxReveal.find('.pw-btn-close').click();
                        } else if (key === 32) {
                            if (that.option.isOkOnly) {
                                $maxReveal.find('.pw-btn-ok').click();
                            } else if (that.option.isCancelOnly) {
                                $maxReveal.find('.pw-btn-close').click();
                            } else {
                                $maxReveal.find('.pw-btn-ok').click();
                            }
                        }
                    }
                });
            }
        };
        PopupWin.prototype.closeEvent = function(){
            if (this.option.close) {
                this.option.close();
            }
            this.animate('close');
        };
        PopupWin.prototype.okEvent = function(){
            if (this.option.ok) {
                this.option.ok();
            } else {
                this.$close.click();
            }
        };
        PopupWin.prototype.initPopupwin = function () {
            this.$title.text(this.option.title);
            var that = this;
            if (this.option.htmlUrl) {
                $http({
                    method: 'GET',
                    url: that.option.htmlUrl
                }).success(function (html) {
                    that.bindBtn(html);
                    that.initEvent();
                    that.$body.empty().append(html);
                    that.compileAndAppend();
                    that.show();
                });
            } else if (this.option.html) {
                that.bindBtn(html);
                that.initEvent();
                that.$body.empty().append(this.option.html);
                that.compileAndAppend();
                that.show();
            }
            this.$okBtn.text(this.option.okBtnText);
            this.$closeBtn.text(this.option.closeBtnText);
            var shown_count = $('.popupwin:visible').length;
            var bgZindex = this.option.zIndex + shown_count * 10;
            var popupwinZindex = this.option.zIndex + shown_count * 10 + 1;
            this.$bg.css('z-index', bgZindex);
            this.$container.css('z-index', popupwinZindex);
        };
        PopupWin.prototype.show = function () {
            this.animate('show');
        };
        PopupWin.prototype.close = function () {
            this.$closeBtn.click();
        };
        PopupWin.prototype.animate = function (type) {
            var an = this.option.animation;
            var anTime = this.option.animationTime;
            var that = this;
            if (type === 'close') {
                if (an === 'fade') {
                    this.$bg.fadeOut(600);
                    this.$container.fadeOut(600);
                } else {
                    this.$bg.hide();
                    if (an === 'none') {
                        this.$container.hide();
                    } else {
                        var obj = {top: 0, right: 1, bottom: 2, left: 3};
                        var array = [{top: -1000}, {left: 1800}, {top: 1000}, {left: -1800}, {opacity: 0}, {width: 0}];
                        if (an === 'random') {
                            this.$container.animate(array[Math.floor(Math.random() * 6)], anTime, function () {
                                that.$container.hide();
                            });
                        } else {
                            this.$container.animate(array[obj[an]], anTime, function () {
                                that.$container.hide();
                            });
                        }
                    }
                }
                setTimeout(function(){that.$pop.remove();}, 700);
            } else {
                this.$container.css('width', that.option.width);
                this.$container.css('top', that.option.top);
                this.$container.fadeIn(anTime);
                this.$bg.fadeIn(anTime);
            }
            
        };
        /**
         * 该方法暂时行不通 2017-04-30
         */
        /* 初始化按钮为禁用状态 */
        PopupWin.prototype.bindBtn = function (html) {
            // 判断模板中是否存在form表单且form表单中是否存在button
            // 如果存在,则需要将确定按钮的状态按需置为禁用
            var $html = $(html);
            var $form = $html[0].nodeName === 'FORM' ? $html : $html.find('form');
            if ($form.length !== 0 && $form.find('button').length === 0) {
                var formName = $form.attr('name');
                this.$okBtn.attr('ng-disabled', formName + '.$invalid || ' + formName + '.$pristine');
            }
        };
        PopupWin.prototype.compileAndAppend = function(){
            $('body').append($compile(this.$pop)(this.option.scope));
        };
        return PopupWin;
    });
    // return PopupWin;
});
