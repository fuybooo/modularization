//noinspection JSFileReferences
require.config({
    baseUrl : './app/',
    waitSeconds: 0, //永不超时
    paths : {
        // 库文件
        'angular':'vendor/angular/angular',
        'angular-animate':'vendor/angular-animate/angular-animate',
        'angular-touch':'vendor/angular-touch/angular-touch',
        'angular-bootstrap':'vendor/angular-bootstrap/ui-bootstrap-tpls',
        'angular-ui-router':'vendor/angular-ui-router/release/angular-ui-router',
        'restangular':'vendor/restangular/dist/restangular',
        'angular-sanitize':'vendor/angular-sanitize/angular-sanitize',
        'angular-ui-load':'vendor/angular-ui-load/angular-ui-load',
        'angular-async-loader':'vendor/angular-async-loader/angular-async-loader',
        'jquery':'vendor/jquery/jquery',
        'bootstrap-table':'vendor/bootstrap-table/src/bootstrap-table',
        'bootstrap-table-zh-CN':'vendor/bootstrap-table/src/locale/bootstrap-table-zh-CN',
        'bootstrap-select':'vendor/bootstrap-select/dist/js/bootstrap-select',
        'bootstrap':'vendor/bootstrap/dist/js/bootstrap',
        'underscore':'vendor/underscore/underscore',
        'lodash':'vendor/lodash/lodash',
        'zTree':'vendor/zTree/js/jquery.ztree.all.min',
        'ECharts':'vendor/echarts/echarts-all',
        // 'baidu-map': 'vendor/echarts/dist/extension/bmap',
        'bootstrap-datetimepicker':'vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker',
        'bootstrap-datetimepicker-zh-CN':'vendor/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN',

        // app文件
        'app': 'scripts/configs/app',
        'router': 'scripts/configs/router',
        'commonService': 'scripts/common/common-service',
        'dataService': 'scripts/common/data-service',
        'popupwinService': 'scripts/common/popupwin-service',
        'commonDirective': 'scripts/common/common-directive'
    },
    shim : {
        'angular':{
            exports : 'angular'
        },
        'angular-animate':{
            deps:['angular'],
            exports:'angular-animate'
        },
        'angular-touch':{
            deps:['angular'],
            exports:'angular-touch'
        },
        'angular-bootstrap':{
            deps:['angular'],
            exports:'angular-bootstrap'
        },
        'angular-ui-router':{
            deps:['angular'],
            exports:'angular-ui-router'
        },
        'restangular':{
            deps:[
                'angular',
                'underscore',
                'lodash'
            ],
            exports:'restangular'
        },
        'angular-sanitize':{
            deps:['angular'],
            exports:'angular-sanitize'
        },
        'angular-ui-load':{
            deps:['angular'],
            exports:'angular-ui-load'
        },
        'angular-async-loader':{
            deps:['angular'],
            exports:'angular-async-loader'
        },
        'bootstrap':{
            deps:['jquery']
        },
        'bootstrap-table':{
            deps:['bootstrap']
        },
        'bootstrap-select':{
            deps:['bootstrap']
        },
        'zTree':{
            deps:['jquery']
        },
        'ECharts':{
            deps:['jquery']
        },
        'jqueryUi':{
            deps:['jquery']
        },
        'jquery-timepicker-addon':{
            deps:['jqueryUi']
        },
        'bootstrap-table-zh-CN':{
            deps:['bootstrap-table']
        },
        'jquery-ui-timepicker-zh_CN':{
            deps:['jquery-timepicker-addon']
        },
        'app':{
            deps:[
                'angular',
                'angular-async-loader',
                'angular-ui-router',
                'angular-ui-load',
                'restangular',
                'angular-sanitize',
                'angular-animate',
                'angular-touch',
                'angular-bootstrap'
            ]
        },
        'bootstrap-datetimepicker':{
            deps:['jquery', 'bootstrap']
        },
        'bootstrap-datetimepicker-zh-CN':{
            deps:['bootstrap-datetimepicker']
        }
    }
});

require(
    [
        'angular',
        'jquery',
        'underscore',

        'angular-async-loader',
        'angular-ui-load',
        'angular-ui-router',
        'angular-animate',
        'angular-sanitize',
        'angular-touch',
        'angular-bootstrap',
        'restangular',

        'bootstrap',
        'zTree',
        'ECharts',
        // 'baidu-map',

        'bootstrap-table',
        'bootstrap-select',
        'bootstrap-datetimepicker',

        'bootstrap-table-zh-CN',
        'bootstrap-datetimepicker-zh-CN',

        'app',
        'router',
        'commonService',
        'dataService',
        'popupwinService',
        'commonDirective',

        'require',
        'exports',
        'module'
    ],
    function (angular) {
        angular.element(document).ready(function () {
            angular.bootstrap(document,['app']);
        });
    }
);


