define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    var angular = require('angular');
    /**
     * 生成百度地图
     */
    app
        .directive('baiduMap', function ($window) {
            return {
                template: '<div class="w1000 h600" id="baidu-map-demo"></div>',
                link: function(scope, ele){
                    var createMap = function(){
                        var map = new BMap.Map('baidu-map-demo');
                        //鼠标滚轮
                        map.enableScrollWheelZoom();
                        //启动地图的惯性拖拽
                        map.enableInertialDragging();
                        //启用连续缩放效果
                        map.enableContinuousZoom();

                        //比例尺控件
                        map.addControl(new BMap.ScaleControl());
                        //缩略图控件
                        map.addControl(new BMap.OverviewMapControl());
                        //地图类型控件
                        map.addControl(new BMap.MapTypeControl());
                        //定位控件
                        map.addControl(new BMap.GeolocationControl());

                        //中心点
                        var point = new BMap.Point(114.4252160000,35.0468480000);

                        //构建地图
                        map.centerAndZoom(point, 13);

                        var getBoundary = function(){
                            var boundary = new BMap.Boundary();
                            console.log(boundary);
                            boundary.get('封丘县', function(rs){
                                console.log('rs', rs);
                                map.clearOverlays();
                                var count = rs.boundaries.length;
                                if (count === 0) {
                                    alert('未能获取当前输入行政区域');
                                    return ;
                                }
                                var pointArray = [];
                                for (var i = 0; i < count; i++) {
                                    var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
                                    map.addOverlay(ply);  //添加覆盖物
                                    pointArray = pointArray.concat(ply.getPath());
                                }
                                map.setViewport(pointArray);    //调整视野
                                // addlabel();
                            });
                        };
                        getBoundary();

                    };
                    var script = document.createElement('script');
                    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=xhQEBQemALNp7YgiQxVvny0QkmOmyO0d&callback=baiduMapLoaded()';
                    document.body.appendChild(script);
                    $window.baiduMapLoaded = function(){
                        createMap();
                    };




                }
            }
        })
    ;
    
});