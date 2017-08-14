define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('LandingController', function ($scope, $state, $http, dataService) {
        
        // 每个数字的宽度
        var NUMBER_W = 7;
        // 每个数字的高度
        var NUMBER_H = 10;
        // 数字的数组,包括冒号和中划线
        var NUMBERS = [
            [
                '0011100',
                '0110110',
                '1100011',
                '1100011',
                '1100011',
                '1100011',
                '1100011',
                '1100011',
                '1100011',
                '0011100',
                '0110110'
            ],
            [
                '0001100',
                '0111100',
                '0001100',
                '0001100',
                '0001100',
                '0001100',
                '0001100',
                '0001100',
                '0001100',
                '1111111'
            ],
            [
                '0111110',
                '1100011',
                '0000011',
                '0000110',
                '0001100',
                '0011000',
                '0110000',
                '1100000',
                '1100011',
                '1111111'
            ],
            [
                '1111111',
                '0000011',
                '0000110',
                '0001100',
                '0011100',
                '0000110',
                '0000011',
                '0000011',
                '1100011',
                '0111110'
            ],
            [
                '0000110',
                '0001110',
                '0011110',
                '0110110',
                '1100110',
                '1111111',
                '0000110',
                '0000110',
                '0000110',
                '0001111'
            ],
            [
                '1111111',
                '1100000',
                '1100000',
                '1111110',
                '0000011',
                '0000011',
                '0000011',
                '0000011',
                '1100011',
                '0111110'
            ],
            [
                '0000110',
                '0011000',
                '0110000',
                '1100000',
                '1101110',
                '1100011',
                '1100011',
                '1100011',
                '1100011',
                '0111110'
            ],
            [
                '1111111',
                '1100011',
                '0000110',
                '0000110',
                '0001100',
                '0001100',
                '0011000',
                '0011000',
                '0011000',
                '0011000'
            ],
            [
                '0111110',
                '1100011',
                '1100011',
                '1100011',
                '0111110',
                '1100011',
                '1100011',
                '1100011',
                '1100011',
                '0111110'
            ],
            [
                '0111110',
                '1100011',
                '1100011',
                '1100011',
                '0111011',
                '0000011',
                '0000011',
                '0000110',
                '0001100',
                '0110000'
            ],
            [
                '0000',
                '0000',
                '0110',
                '0110',
                '0000',
                '0000',
                '0110',
                '0110',
                '0000',
                '0000'
            ]
        ];
        var W = $(window).width();
        var H = $(window).height() - 183;
        // 小球的半径
        var R = W / 36 / 5 - 1;
        var num_w = (2 * NUMBER_W + 1) * (R + 1);
        var colon_w = 9 * (R + 1);
        // 数字距离画布顶部的距离
        var TOP = 60;
        // 数字距离画布左边的距离
        var LEFT = W / 5;
        var leftArr = [
            LEFT,
            LEFT + num_w,
            LEFT + 2 * num_w,
            LEFT + 2 * num_w + colon_w,
            LEFT + 3 * num_w + colon_w,
            LEFT + 4 * num_w + colon_w,
            LEFT + 4 * num_w + 2 * colon_w,
            LEFT + 5 * num_w + 2 * colon_w
        ];
        
        var balls = [];
        var colors = [
            '#33b5e5',
            '#0099cc',
            '#aa66cc',
            '#99cc00',
            '#669900',
            '#ffbb33',
            '#ff8800',
            '#ff4444',
            '#cc0000'
        ];
        
        
        
        var canvas = $('.landing-canvas')[0];
        canvas.width = W;
        canvas.height = H;
        
        var context = canvas.getContext('2d');
        var currentTime = getCurrentTime();
        // 绘制时钟
        setInterval(function () {
            render(context);
            update();
        }, 50);
        
        function render(cxt) {
            // 清空画布
            cxt.clearRect(0, 0, W, H);
            
            // 获取当前时间的时分秒
            
            var hour = currentTime.hour;
            var minute = currentTime.minute;
            var second = currentTime.second;
            
            // 绘制时间
            
            // 小时
            renderNumber(leftArr[0], TOP, hour[0], cxt);
            renderNumber(leftArr[1], TOP, hour[1], cxt);
            
            // 绘制冒号
            renderNumber(leftArr[2], TOP, 10, cxt);
            
            // 分钟
            renderNumber(leftArr[3], TOP, minute[0], cxt);
            renderNumber(leftArr[4], TOP, minute[1], cxt);
            
            // 绘制冒号
            renderNumber(leftArr[5], TOP, 10, cxt);
            
            // 秒钟
            renderNumber(leftArr[6], TOP, second[0], cxt);
            renderNumber(leftArr[7], TOP, second[1], cxt);
            
            renderBalls(cxt);
        }
        
        // 绘制一个数字
        function renderNumber(x, y, num, cxt) {
            cxt.fillStyle = 'rgb(0, 102, 153)';
            for (var i = 0; i < NUMBER_H; i++) {
                for (var j = 0; j < NUMBER_W; j++) {
                    var item = NUMBERS[num - 0][i][j];
                    if (item === '1') {
                        // 绘制一个小球
                        cxt.beginPath();
                        cxt.arc(x + (j * 2 + 1) * (R + 1), y + (i * 2 + 1) * (R + 1), R, 0, 2 * Math.PI);
                        cxt.closePath();
                        cxt.fill();
                    }
                }
            }
        }
        
        function renderBalls(cxt) {
            
            for (var i = 0, l = balls.length; i < l; i++) {
                
                var item = balls[i];
                cxt.fillStyle = item.color;
                cxt.beginPath();
                cxt.arc(item.x, item.y, R, 0, 2 * Math.PI, true);
                cxt.closePath();
                cxt.fill();
            }
        }
        
        function getCurrentTime() {
            var date = new Date();
            var hour = ('0' + date.getHours()).slice(-2);
            var minute = ('0' + date.getMinutes()).slice(-2);
            var second = ('0' + date.getSeconds()).slice(-2);
            return {
                hour: hour,
                minute: minute,
                second: second
            };
        }
        
        function update() {
            var time = getCurrentTime();
            if (time.second !== currentTime.second) {
                // 小时数发生了改变,则添加小球
                if (currentTime.hour[0] !== time.hour[0]) {
                    addBalls(leftArr[0], TOP, time.hour[0]);
                }
                if (currentTime.hour[1] !== time.hour[1]) {
                    addBalls(leftArr[1], TOP, time.hour[1]);
                }
                if (currentTime.minute[0] !== time.minute[0]) {
                    addBalls(leftArr[3], TOP, time.minute[0]);
                }
                if (currentTime.minute[1] !== time.minute[1]) {
                    addBalls(leftArr[4], TOP, time.minute[1]);
                }
                if (currentTime.second[0] !== time.second[0]) {
                    addBalls(leftArr[6], TOP, time.second[0]);
                }
                if (currentTime.second[1] !== time.second[1]) {
                    addBalls(leftArr[7], TOP, time.second[1]);
                }
                currentTime = time;
            }
            updateBalls();
        }
        
        function addBalls(x, y, num) {
            for (var i = 0; i < NUMBER_H; i++) {
                for (var j = 0; j < NUMBER_W; j++) {
                    var item = NUMBERS[num - 0][i][j];
                    if (item === '1') {
                        var ball = {
                            x: x + (j * 2 + 1) * (R + 1),
                            y: y + (i * 2 + 1) * (R + 1),
                            g: 1.5 + Math.random(),
                            vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                            vy: -5,
                            color: colors[Math.floor(Math.random() * colors.length)]
                        };
                        balls.push(ball);
                    }
                }
            }
        }
        
        function updateBalls() {
            for (var i = 0, l = balls.length; i < l; i++) {
                var item = balls[i];
                item.x += item.vx;
                item.y += item.vy;
                item.vy += item.g;
                if (item.y >= H - R) {
                    item.y = H - R;
                    item.vy = -item.vy * 0.75;
                }
            }
            var count = 0;
            // 对每个小球的位置进行更新之后,如果小球已经不在屏幕内了,则删除之
            for (i = 0, l = balls.length; i < l; i++) {
                item = balls[i];
                // 在屏幕内的小球
                if (item.x + R > 0 && item.x - R < W) {
                    balls[count++] = balls[i];
                }
            }
            
            while (balls.length > Math.min(600, count)) {
                balls.pop();
            }
        }
    });
    
});