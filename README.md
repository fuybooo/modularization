#trustdata

云创远景门户

##项目环境

#####requirejs + angularjs + gulp + bower + npm

##目录结构

    trustdata/
    ├── app                                开发目录
    │   ├── images                         图片
    │   │   ├── logo.png
    │   │   ├── ..
    │   │   └── ..
    │   ├── json                           json
    │   │   ├── login.json
    │   │   ├── ..
    │   │   └── ..
    │   ├── scripts                        js资源目录
    │   │   ├── configs                    项目配置
    │   │   │   ├── app.js                 主模块
    │   │   │   ├── config.js              requirejs配置
    │   │   │   ├── router.js              angularjs路由
    │   │   │   ├── ..
    │   │   │   └── ..
    │   │   ├── controllers                控制器
    │   │   │   ├── login-controller.js
    │   │   │   ├── ..
    │   │   │   └── ..
    │   │   ├── directives                 指令
    │   │   │   ├── login-directive.js
    │   │   │   ├── ..
    │   │   │   └── ..
    │   │   ├── filters                    过滤器
    │   │   │   ├── login-filter.js
    │   │   │   ├── ..
    │   │   │   └── ..
    │   │   ├── services                   服务
    │   │   │   ├── data-service.js
    │   │   │   ├── ..
    │   │   │   └── ..
    │   ├── styles                         样式
    │   │   ├── base.css
    │   │   ├── style.css
    │   │   ├── ..
    │   │   └── ..
    │   ├── views                          模板
    │   │    ├── login.html
    │   │    ├── ..
    │   │    └── ..
    │   ├── vendor                     库文件
    │   │    └── angular
    │   │       └── angular.js
    │   │    ├── ..
    │   │    └── ..
    ├── dist                               压缩目录
    ├── gulpfile.js                        自动化工作流配置
    ├── LICENSE
    ├── package.json
    ├── README.md
    └── test                               测试目录
        ├── karma.conf.js                  karma配置文件
        ├── scripts                        karma测试目录
        └── test-main.js


##使用说明

#####1.项目环境，需先安装git，nodejs，bower
#####2.项目从git服务器down下来后，通过终端进入到项目的当前目录: cd /trustdata
#####3.执行相关命令：
###### <1>.npm install
###### <2>.bower install
#####4.增加新的前端插件库
###### <1>.bower install package --save
#####5.增加新的后端插件库
###### <1>.npm install package --save

##开发工具

#####推荐webstorm，最新版是webstorm2016.2，该软件是收费的，请百度破解