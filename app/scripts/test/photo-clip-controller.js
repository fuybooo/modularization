define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('PhotoClipController', function ($rootScope, $scope, $state, $compile, commonService, dataService, Popupwin) {
        var doc = document;
        var $map = {
            file: $('#test-photo-file'),
            imgDisplay: $('#photo-img-display')
        };
        var WIDTH = 600;
        var HEIGHT = 400;
        $scope.selectPhoto = function () {
            $map.file.click();
        };

        // getCtx
        function getCtx(id, w, h) {
            var canvas = doc.getElementById(id);
            canvas.width = w || WIDTH;
            canvas.height = h || HEIGHT;
            return canvas.getContext('2d');
        }

        var ctx = getCtx('photo-clip-canvas');

        // 根据图片的宽度/高度和容器的宽度/高度计算出适应容器大小的图片的宽度和高度
        function getImgParam(w, h) {
            var rate_w = w / WIDTH;
            var rate_h = h / HEIGHT;
            var result_w = 0;
            var result_h = 0;
            var left = 0;
            var top = 0;
            // 图片的宽高均小于容器
            if (rate_h <= 1 && rate_w <= 1) {
                result_h = h;
                result_w = w;
            } else {
                // 图片的宽的比率更高
                if (rate_w >= rate_h) {
                    result_w = WIDTH;
                    result_h = h / rate_w;
                } else {
                    result_h = HEIGHT;
                    result_w = w / rate_h;
                }
            }

            left = (WIDTH - result_w) / 2;
            top = (HEIGHT - result_h) / 2;

            return {
                left: left,
                top: top,
                width: result_w,
                height: result_h
            };
        }

        // 使用canvas绘制图片
        function drawImg(imgObj) {
            /**
             *  drawImage:
             *  参数     描述
             *  img
             *  sx        可选。开始剪切的 x 坐标位置。
             *  sy        可选。开始剪切的 y 坐标位置。
             *  swidth    可选。被剪切图像的宽度。
             *  sheight   可选。被剪切图像的高度。
             *  x         在画布上放置图像的 x 坐标位置。
             *  y         在画布上放置图像的 y 坐标位置。
             *  width     可选。要使用的图像的宽度。（伸展或缩小图像）若设置为画布的宽则会充满画布（设置高的时候需要进行等比缩放）
             *  height    要使用的图像的高度。（伸展或缩小图像）
             *
             *
             */

                // 根据容器大小，获得等比图片大小
            var param = getImgParam(imgObj.width, imgObj.height);
            // 清空画布
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            // 绘制图片
            ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, param.left, param.top, param.width, param.height);
        }


        $map.file.on('change', function () {
            var imgFile = $(this)[0].files[0];
            if (imgFile && commonService.REGEXP.pictureFile.test(imgFile.name)) {
                var fileReader = new FileReader();
                fileReader.onloadend = function () {

                    // 1.使用img展示图片

                    $map.imgDisplay[0].src = fileReader.result;

                    // 2.使用canvas展示图片
                    var virtualImg = new Image();
                    virtualImg.src = fileReader.result;
                    virtualImg.onload = function () {
                        drawImg(this);
                    }

                };
                fileReader.readAsDataURL(imgFile);
            } else {
                commonService.alert('请选择正确格式的文件！', 1);
            }

        });

    });

});