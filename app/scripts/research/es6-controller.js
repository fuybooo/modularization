define(['require'],function(require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('ES6Controller', function (dataService) {
        var _this = this;
        // dataService.get('es6');
        console.log('===============================正式开始typescript,同时也包含ES6==========');
        {
            // 布尔值
            var isDone = false;
            // 数字
            var num = 1;
            var decLiteral = 10; // 十进制
            var hexLiteral = 0xf00d; //十六进制
            var binaryLiteral = 9; // 二进制
            var octalLiteral = 484; // 八进制
        }
        {
            // 字符串
            var str1 = 'bob';
            str1 = 'fu';
            var name_1 = "bob";
            var age = 26;
            var sentence = "Hello, my name is " + name_1 + ",\n                                I'll be " + (age + 1) + " years old next month.";
            console.log(sentence);
        }
        {
            // 数组
            var list = [1, 2, 3];
            // 数组泛型
            var listE = [1, 2, 3];
            // 元组 Tuple
            var x = void 0;
            x = ['ok', 1];
            console.log(x[0]);
        }
        {
            // 枚举 enum
            var Color;
            (function (Color) {
                Color[Color["red"] = 0] = "red";
                Color[Color["green"] = 1] = "green";
                Color[Color["blue"] = 2] = "blue";
            })(Color || (Color = {}));
            ;
            var c = Color.blue;
            console.log('枚举类型值:', c);
            var colorName = Color[2];
            console.log('colorName:', colorName);
        }
        {
            // 任意值
            var notSure = 4;
            notSure = 'maybe a string instead';
            notSure = false;
        }
        {
            // 空值
            var unusable = undefined; // void类型的值只能是undefined或者null
            // null 和 undefined
            var n = null;
            var u = undefined;
        }
        {
            // never 类型,无法到达终点的函数的返回值类型?
            function e(m) {
                throw new Error(m); // 此处无法返回任何值,即无法到达终点
            }
            // function fail(){
            //     return error('error');// 返回值类型为never
            // }
            function infiniteLoop() {
                while (true) {
                }
            }
        }
        {
            // 类型断言: 尖括号 法
            var someValue = 'this is a string';
            var strLength = someValue.length;
            // as
            var someV = 'this is a string';
            var strL = someV.length;
        }
        {
            // 接口初探
            // 不用接口限制参数的规则
            function print1(object) {
                console.log(object.label);
            }
            print1({ label: 'string类型' });
            function print2(object) {
                console.log(object.label);
            }
            print2({ label: 'string类型2' });
            // ReadonlyArray
            var a = [1, 2];
            var ro = a;
            var b = ro;
            // 这里只是规定基本类型
            // 要理解接口的真正威力，还是得先复习一下ES6的代码
        }
        console.log('==========================================================================ES6');
        {
            // let 命令
            // 根据描述脑补代码
            // 1.let声明的代码只在其代码块内有效
            // 2.for循环中，循环语句部分是父代码块，循环体是子代码块
            var fnArr = [];
            var _loop_1 = function (i) {
                var i_1 = 'h';
                console.log(i_1);
                // 子代码块中能访问父代码块中的变量ｉ，父代码块中不能访问子代码块中的ｉ
                // 子代码块中的函数
                fnArr[i_1] = function () {
                    console.log(i_1);
                };
                // 函数在执行的时候，会去寻找i，发现在其定义的地方有i，且值就是定义它时候的值-->下一次循环时，又创建了一个子代码块，两个代码块之间没有关联，i互不影响
            };
            for (var i = 0; i < 10; i++) {
                _loop_1(i);
            }
            // 2.不存在变量提升 --> 暂时性死区，不声明则没有死区，只要使用let声明变量v，则在声明之前使用v都会导致一个错误
            // 3.不允许重复声明
            // 4.块级作用域 --> 据我观察，{}内的代码会被视为块，特殊情况除外，如声明一个对象字面量... 等
            // const命令
            // 1. const声明一个只读的常亮
            // 2. const一旦声明必须立刻赋值，即声明语句和赋值语句是同一条语句
            // 3. const声明复合数据（主要指对象和数组）时，只是保持内存地址不改变
            // es5声明变量只有var function两种
            // es6新增了let const import class 四种
            // ※let const 声明的变量不再是window对象的属性了
        }
        {
            console.log('===========================解构赋值');
            // 结构赋值
            var _a = [1, 23, 4, 5], a = _a[0], b = _a[1], c = _a[2];
            console.log(a, b, c);
        }
        {
            console.log('===========================使用嵌套数组进行解构');
            var _b = [1, [2, [3, [4]]]], a = _b[0], _c = _b[1], b = _c[0], _d = _c[1], c = _d[0], d = _d[1][0];
            console.log(a, b, c, d);
        }
        {
            console.log('============================剩余值rest');
            var _e = [1, 2, 3, 4, 5], a = _e[0], b = _e.slice(1);
            console.log(a, b);
            // 如果结构不成功，则变量的值为undefined，rest的值为[]
            var _f = [1], value = _f[0], undefined_value = _f[1], rest_value = _f.slice(2);
            // value 1,undefined_value undefined rest_value []
        }
        {
            // 解构具有Iterator接口的数据结构
            // 在Generator函数一章中再看
        }
        {
            console.log('=======================解构赋值默认值');
            // 解构赋值指定默认值
            var _g = [][0], foo = _g === void 0 ? true : _g;
            var _h = ['boer'][0], bar = _h === void 0 ? 'bob' : _h;
            var _j = [undefined][0], a = _j === void 0 ? 'a' : _j; // a = 'a'
            var _k = [null][0], b = _k === void 0 ? 'b' : _k; // b = null，解构赋值内部使用严格相等来判断一个位置是否有值，即如下都能成功赋值
            var _l = [''][0], c = _l === void 0 ? 'c' : _l;
            var _m = [0][0], d = _m === void 0 ? 'd' : _m;
            var _o = [false][0], e_1 = _o === void 0 ? 'e' : _o;
            // 默认值为表达式时
            var fn = function (v) {
                console.log(v);
                return 2;
            };
            var _p = [1][0], f = _p === void 0 ? fn('f') : _p; // fn根本不执行
            var _q = [][0], g = _q === void 0 ? fn('g') : _q; // fn会执行 输出g
            // 默认值可以引用解构赋值的其他变量
            var _r = [10], _s = _r[0], h = _s === void 0 ? 1 : _s, _t = _r[1], l = _t === void 0 ? fn(h) : _t; // 输出10，输出的值是h解构完成之后的值，而不是默认值
            // let [i, j = fn(i)] = []; 编译不通过，i必须赋值之后才能被j中的fn使用
        }
        {
            //对象的解构赋值
            var _u = { bar: 'bar', foo: 'foo' }, foo = _u.foo, bar = _u.bar; // 对象解构，根据属性名来对应，不根据顺序对应 bar： bar foo: foo
            // let {baz} = {bar: 'bar', bas: 'bas'}; // 编译不通过，如果编译通过，则baz的值为undefined
        }
        {
            // 上面的写法等同于
            var _v = { bar: 'bar', foo: 'foo' }, foo = _v.foo, bar = _v.bar; // 上面的写法是这种写法的简写形式
        }
        {
            // 对象解构赋值时，如果要赋值的变量名与对象中的属性名不能对应，则，必须使用详细的写法
            // 这种写法相当于声明了baz，b，所以，baz和b不能在此之前或之后声明，否则报错
            var _w = { foo: 'foo', bar: 'bar' }, baz = _w.foo, b = _w.bar; // baz: foo b: bar
        }
        {
            // 对象解构的嵌套使用
            var _x = { p: ['hello', { y: 'world' }] }.p, x = _x[0], y = _x[1].y; // 相当于声明了x ,y 两个变量，分别赋值为 hello world
        }
        {
            // 解构赋值的默认值与数组类似
            var x = void 0;
            (_y = { x: undefined }.x, x = _y === void 0 ? 9 : _y); // x = 9
            // 圆括号配合解构赋值, 没有卵用，但是合法的表达式
            ([true, false]);
            ('a');
            ([]);
        }
        {
            // 解构赋值的用途
            // 1. 方便的使用已定义的对象的方法
            var abs = Math.abs, floor = Math.floor, ceil = Math.ceil; // 编译成es5之后： var abs = Math.abs, floor = Math.floor, ceil = Math.ceil;
            console.log(abs, floor, ceil);
            // 2. 数组取值的巧妙使用 -- > 对数组进行对象解构
            var arr = [1, 2, 3];
            var first = arr[0], _z = arr.length - 1, last = arr[_z]; // 其中[arr.length - 1] 是属性名表达式，不能用圆括号！！ first = 1，last = 3
        }
        {
            // 字符串的解构赋值
            // let [a,b,c,d,e] = 'hello'; // 在typescript环境下报错// 不过可以强行编译
            var len = 'hello'.length;
            console.log('len:', len);
        }
        {
            // 函数参数的解构赋值
            var add = function (_a) {
                var x = _a[0], y = _a[1];
                var res = x + y;
                console.log(res);
                return res;
            };
            add([1, 2]); // 表面上传递了一个数组作为参数，实际上，是传入了 x = 1, y = 2这两个参数
            // 解析成es5之后，是将add的参数当成一个数组来处理的
        }
        {
            // 来一个复杂一点的例子
            var a = [[1, 3], [2, 4]];
            var b = a.map(function (_a) {
                var a = _a[0], b = _a[1];
                return a + b;
            });
            console.log(a, b);
        }
        {
            // 函数参数的解构赋值
            var move = function (_a) {
                var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 1 : _c, _d = _b.y, y = _d === void 0 ? 1 : _d;
                return [x, y];
            };
            var a = move({ x: 3, y: 8 }); // [3, 8]
            console.log(a);
            var b = move({ x: 3 }); // [3, 1]
            console.log(b);
            var c = move({}); // [1, 1]
            console.log(c);
            var d = move(); // [1, 1]
            console.log(d);
        }
        {
            // 圆括号的使用总结：
            // 1.变量声明语句中不能带有圆括号
            // 2.函数参数中，模式不能带有圆括号
            // 3.赋值语句中，不能将整个模式，或者嵌套语句中的一层放到圆括号中
            // 可以使用圆括号的地方
            // 1.赋值语句的非模式部分可以使用
        }
        {
            // 变量的解构赋值的用途
            // 1.交换变量的值
            var x = 1, y = 2;
            _0 = [y, x], x = _0[0], y = _0[1]; // 交换两者的值
            // 2.函数返回数组或者对象时，可以通过解构赋值方便的取出返回值
            // 3.函数参数的定义，其实就是传入一个数组或者一个对象
            // 4.解构赋值提取对象的值
            var a = {
                id: 1,
                name: 'bob',
                fun: {
                    swim: 'good',
                    basket: 'bad'
                }
            };
            var id = a.id, name_2 = a.name, fun = a.fun;
            console.log(id, name_2, fun);
            // 5.函数参数的默认值
            var func = function (url, _a) {
                var _b = _a.ok, ok = _b === void 0 ? function () {
                    console.log(url);
                } : _b, _c = _a.cancel, cancel = _c === void 0 ? function () {
                    console.log(name, title);
                } : _c, _d = _a.name, name = _d === void 0 ? 'fu' : _d, _e = _a.title, title = _e === void 0 ? 'title' : _e;
                ok();
                cancel();
            };
            func('1', { name: 'bob' });
            // 6.遍历Map结构
            // 7.输入模块的指定方法
            // const {SourceMapConsumer, SourceNode} = require('source-map');
        }
        {
            console.log('============================================字符串扩展');
            // 1.字符的unicode表示法
            var a = '\u0061';
            console.log(a);
            var b = '\uD824\uDFB7';
            console.log(b);
            // 表示一个字符的六种方法
            var z1 = 'z';
            var z2 = '\172';
            var z3 = '\x7a';
            var z4 = '\u007a';
            var z5 = "z";
            var z6 = '\z';
        }
        {
            // 字符串的遍历器接口,可以正确识别大于\uFFFF 的码点
            for (var _i = 0, _1 = 'foo'; _i < _1.length; _i++) {
                var ch = _1[_i];
                console.log(ch);
            }
        }
        {
            // 字符串的正规化
            // let a = '\u01D1';
            // console.log(a.normalize() === '\u004F\u030C'.normalize());
        }
        {
            // ES6提供的新的字符串的方法
            var s = 'fuybooo';
            // let sw = s.startsWith('f'); // typescript不支持？
            // let ew = s.endsWith('b', 4);
            // let includes = s.includes('oo');
            // let rs = s.repeat(2);
            // console.log(sw);
        }
        {
            // 模板字符串
            var s = "fuybooo";
            var company = "thunder" + "soft";
            var email = s + "@" + company + ".com";
            console.log(email);
            // sql语句的拼接
            var name_3 = 'fuybooo';
            var id = '2333-2344-9944';
            var sql = "\n                select * from t_topic where \n                id = '" + id + "'\n                and name = '" + name_3 + "'\n            ";
            console.log('sql', sql);
        }
        {
            // 函数的扩展
            //1.函数的默认值
            // 双重默认值，调用fn的时候，可以不传第二个参数，传了第二个参数也可以不传method和dataType
            var fn = function (url, _a) {
                var _b = _a === void 0 ? {} : _a, _c = _b.method, method = _c === void 0 ? 'get' : _c, _d = _b.dataType, dataType = _d === void 0 ? 'json' : _d;
                console.log(arguments);
                console.log(url, method, dataType);
            };
            fn(1);
            fn(1, { method: 'post' });
        }
        {
            // 考察如下两个函数
            var fn1 = function (_a) {
                var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d;
                return [x, y];
            };
            var fn2 = function (_a) {
                var _b = _a === void 0 ? { x: 0, y: 0 } : _a, x = _b.x, y = _b.y;
                return [x, y];
            };
            console.log('不传值');
            console.log(fn1());
            console.log(fn2());
            console.log('都传值');
            console.log(fn1({ x: 3, y: 8 }));
            console.log(fn2({ x: 3, y: 8 }));
            console.log('都传空对象');
            console.log(fn1({}));
            console.log(fn2({}));
            console.log('都传错对象');
            console.log(fn1({ z: 1 }));
            console.log(fn2({ z: 1 }));
        }
        // {
        //     // 函数的默认值，一个复杂的例子
        //     var x = 1;
        //     function foo(x, y = function() { x = 2; }) {
        //         var x = 3;
        //         y();
        //         console.log(x);
        //     }
        //     foo();
        // }
        // {
        //     var x = 1;
        //     function foo(x, y = function() { x = 2; }) {
        //         x = 3;
        //         y();
        //         console.log(x);
        //     }
        //     foo();
        // }
        {
            // 严格模式
            function restricted() {
                // 'use strict';
                console.log(arguments);
                // console.log(restricted.arguments); 报错
                // console.log(restricted.caller); 报错
            }
            restricted();
        }
        {
            // rest 参数
            var push = function (array) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                rest.forEach(function (item) {
                    array.push(item);
                });
            };
            var _arr = [];
            push(_arr, 1, 2, 3);
            console.log(_arr);
        }
        {
            // 扩展运算符 spread ... rest参数的逆运算,将数组转换为逗号分隔的参数序列
            console.log('==================================扩展运算符');
            console.log.apply(console, [1, 2, 3]);
            // 扩展运算符主要用于函数调用,替代数组的apply方法
            // 比如
            var push = function (array) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                // rest.forEach(function(item){
                //     array.push(item);
                // });
                array.push.apply(array, rest);
            };
            // 这个push函数将rest参数push进入array,但是,现在要讲一个数组let arr = [1,2,3,4];push进入
            var array = [1];
            var _array = [2, 3, 4, 5];
            push.apply(void 0, [array].concat(_array));
            console.log('使用spread运算符:', array);
            push(array, 10);
            // 用途
            // 思考下面两个问题,如何求一个数组的最大值?如何将一个数组的每一项添加到另一个数组中去?
            Math.max.apply(Math, [1, 2, 3, 4]);
            [].push.apply([], [1, 2, 3]);
            // 合并数组
            var concatArray = [1, 2, 3].concat([2222, 3333, 4444], [1, 2]);
            // 解构赋值
            var ____ = [1, 2, 3, 4];
            // es5
            var _first = ____[0];
            var _rest = ____.slice(1);
            // es6
            var first = ____[0], rest = ____.slice(1);
            // 扩展运算字符串
            var _str = 'abc'.slice(); // 不能随意使用
            console.log(typeof _str); // string
        }
        {
            console.log('============================================================箭头函数');
            // 箭头函数的意思
            var f = function (v) { return v; }; // var f = function (v) { return v; };
            // 理解:
            // 箭头前 : 参数部分 一个参数时省略圆括号,0个或一个以上的参数需要括号
            // 箭头后 : 函数体 -- 返回值  如果函数体只有一条语句,则不需要大括号和return,否则需要
            // 示例:
            var f1 = function () { return 5; };
            var f2 = function (a) { return a; };
            var f3 = function (a, b) { return a + b; };
            var f4 = function (a, b, c) {
                return a + b - c;
            };
            // 如果返回值是一个对象字面量,则需要将对象字面量用圆括号包起来(如果没有return的话)
            var f5 = function (a, b) {
                return { a: a, b: b };
            };
            var f6 = function (a, b) { return ({ a: a, b: b }); };
            // 箭头函数与解构赋值
            var f7 = function (_a) {
                var first = _a.first, second = _a.second;
                return first + ' ' + second;
            };
            // 使用箭头函数表现几个有意义的函数
            var isOdd = function (n) { return n % 2; };
            var square = function (n) { return n * n; };
            // 简化回调
            var data = [1, 2, 3, 4];
            data.map(function (item) { return item * 2; });
            // 注意事项
            // 1.函数体内的this对象,就是定义时所在的对象,而不是运行时所在的对象
            // 2.不可以当做构造函数使用,也就是不能使用new命令
            // 3.不可以使用arguments对象,该对象不存在,es6中有rest参数来替代
            // 4.不可以使用yield命令,即不可以当做Generator函数使用
            // 尤其要注意第一点
            // 示例
            var fn1 = function () {
                setTimeout(function () {
                    console.log(_this.id);
                }, 10);
            };
            // fn1.call({id: 1}); // 编译出来之后,打印undefined
            // 这个例子没有达到检测目的
            // 再看一个例子
            function Timer() {
                var _this = this;
                this.s1 = 0;
                this.s2 = 0;
                // 箭头函数
                setInterval(function () { return _this.s1++; }, 1000); // this指向定义时所在的作用域,即Timer
                // 普通函数
                setInterval(function () {
                    this.s2++;
                }, 1000);
            }
            // let timer = new Timer();
            // setTimeout(() => console.log('s1: ', timer.s1), 3100);
            // setTimeout(() => console.log('s2: ', timer.s2), 3100);
            var fn2 = function () {
                var _this = this;
                this.id = 1;
                return function () {
                    return function () {
                        return function () {
                            return function () {
                                return function () {
                                    console.log(_this.id);
                                };
                            };
                        };
                    };
                };
            };
            fn2();
        }
        {
            console.log('==============================嵌套函数管道机制');
            // 嵌套函数,管道机制
            // 考察如下函数
            var f1 = function (a) { return ({ f2: function () { return ({ f3: function () { return ({ f4: function () { return a; } }); } }); } }); };
            console.log(f1(1).f2().f3().f4());
            // 管道函数 前一个函数的输出结果是后一个函数的输入结果
            var pipeline = function () {
                var funcs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    funcs[_i] = arguments[_i];
                }
                return function (val) { return funcs.reduce(function (a, b) { return b(a); }, val); };
            };
            // 使用管道函数计算斐波拉契数列
            // .. 并不会写
        }
        {
            // 尾调用优化
            // 尾调用就是函数的最后一步是调用另一个函数
            var a_1 = function (x) { return x; };
            var b = function (x) { return a_1(x); }; // 这就是尾调用
            // 测试一下我的想法
            var f1 = function () { return console.log('f1'); };
            var f2 = function () { return console.log('f2'); };
            // 阶乘
            var factorial1_1 = function (n) {
                if (n === 1)
                    return 1;
                return factorial1_1(n - 1) * n;
            };
            // 阶乘优化
            var factorial_1 = function (n, t) {
                if (t === void 0) { t = 1; }
                if (n === 1)
                    return t;
                return factorial_1(n - 1, n * t);
            };
            var res = factorial_1(6);
            console.log(res);
            // 斐波那契数列
            var fibonacci_1 = function (n, next, nextNext) {
                if (next === void 0) { next = 1; }
                if (nextNext === void 0) { nextNext = 1; }
                if (n <= 1)
                    return nextNext;
                return fibonacci_1(n - 1, nextNext, next + nextNext);
            };
            var result = fibonacci_1(100);
            console.log(result);
            // 感觉这样的方法我一辈子也写不出来啊,太玄奥了!
            // 函数式编程 kelihua
        }
        var _y, _0;
    });
});
