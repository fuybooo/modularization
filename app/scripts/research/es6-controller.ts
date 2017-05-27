define(function (require) {
    let app = require('app');
    let $ = require('jquery');
    app.controller('ES6Controller', function (dataService) {
        // dataService.get('es6');
        console.log('===============================正式开始typescript,同时也包含ES6==========');
        {
            // 布尔值
            let isDone: boolean = false;
            // 数字
            let num: number = 1;

            let decLiteral: number = 10; // 十进制
            let hexLiteral: number = 0xf00d;//十六进制
            let binaryLiteral: number = 0b1001; // 二进制
            let octalLiteral: number = 0o744; // 八进制
        }
        {

            // 字符串
            let str1: string = 'bob';
            str1 = 'fu';
            let name: string = `bob`;
            let age: number = 26;
            let sentence: string = `Hello, my name is ${ name },
                                I'll be ${ age + 1 } years old next month.`;
            console.log(sentence);
        }
        {

            // 数组
            let list: number[] = [1, 2, 3];
            // 数组泛型
            let listE: Array<number> = [1, 2, 3];

            // 元组 Tuple
            let x: [string, number];
            x = ['ok', 1];
            console.log(x[0]);
        }
        {

            // 枚举 enum
            enum Color {red, green, blue}
            ;
            let c: Color = Color.blue;
            console.log('枚举类型值:', c);
            let colorName: string = Color[2];
            console.log('colorName:', colorName);
        }
        {

            // 任意值
            let notSure: any = 4;
            notSure = 'maybe a string instead';
            notSure = false;
        }
        {

            // 空值
            let unusable: void = undefined; // void类型的值只能是undefined或者null
            // null 和 undefined
            let n: null = null;
            let u: undefined = undefined;
        }
        {

            // never 类型,无法到达终点的函数的返回值类型?
            function e(m: string): never {
                throw new Error(m); // 此处无法返回任何值,即无法到达终点
            }

            // function fail(){
            //     return error('error');// 返回值类型为never
            // }
            function infiniteLoop(): never {
                while (true) {

                }
            }
        }
        {
            // 类型断言: 尖括号 法
            let someValue: any = 'this is a string';
            let strLength: number = (<string>someValue).length;

            // as
            let someV: any = 'this is a string';
            let strL: number = (someV as string).length;
        }
        {
            // 接口初探
            // 不用接口限制参数的规则
            function print1(object: { label: string }) {
                console.log(object.label);
            }

            print1({label: 'string类型'});

            // 使用接口
            interface Interface1 {
                label: string;
            }
            function print2(object: Interface1) {
                console.log(object.label);
            }

            print2({label: 'string类型2'});

            // ReadonlyArray
            let a: number[] = [1, 2];
            let ro: ReadonlyArray<number> = a;
            let b = ro as number[];

            // 这里只是规定基本类型
            // 要理解接口的真正威力，还是得先复习一下ES6的代码
        }


        console.log('==========================================================================ES6');
        {
            // let 命令


            // 根据描述脑补代码
            // 1.let声明的代码只在其代码块内有效
            // 2.for循环中，循环语句部分是父代码块，循环体是子代码块
            let fnArr = [];
            for (let i = 0; i < 10; i++) {
                let i = 'h';
                console.log(i);
                // 子代码块中能访问父代码块中的变量ｉ，父代码块中不能访问子代码块中的ｉ

                // 子代码块中的函数
                fnArr[i] = function () {
                    console.log(i)
                };
                // 函数在执行的时候，会去寻找i，发现在其定义的地方有i，且值就是定义它时候的值-->下一次循环时，又创建了一个子代码块，两个代码块之间没有关联，i互不影响
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
            console.log('===========================解构赋值')
            // 结构赋值
            let [a, b, c] = [1, 23, 4, 5];
            console.log(a, b, c);
        }

        {
            console.log('===========================使用嵌套数组进行解构')
            let [a, [b, [c, [d]]]] = [1,[2,[3,[4]]]];
            console.log(a,b,c,d);
        }
        {
            console.log('============================剩余值rest')
            let [a,...b] = [1,2,3,4,5];
            console.log(a,b);
            // 如果结构不成功，则变量的值为undefined，rest的值为[]
            let [value, undefined_value, ...rest_value] = [1];
            // value 1,undefined_value undefined rest_value []

        }
        {
            // 解构具有Iterator接口的数据结构
            // 在Generator函数一章中再看
        }
        {
            console.log('=======================解构赋值默认值')
            // 解构赋值指定默认值
            let [foo = true] = [];
            let [bar = 'bob'] = ['boer'];
            let [a = 'a'] = [undefined]; // a = 'a'
            let [b = 'b'] = [null]; // b = null，解构赋值内部使用严格相等来判断一个位置是否有值，即如下都能成功赋值
            let [c = 'c'] = [''];
            let [d = 'd'] = [0];
            let [e = 'e'] = [false];
            // 默认值为表达式时
            let fn = function(v){
                console.log(v);
                return 2;
            };
            let [f = fn('f')] = [1];// fn根本不执行
            let [g = fn('g')] = []; // fn会执行 输出g
            // 默认值可以引用解构赋值的其他变量
            let [h = 1, l = fn(h)] = [10]; // 输出10，输出的值是h解构完成之后的值，而不是默认值
            // let [i, j = fn(i)] = []; 编译不通过，i必须赋值之后才能被j中的fn使用
        }
        {
            //对象的解构赋值
            let {foo, bar} = {bar: 'bar', foo: 'foo'}; // 对象解构，根据属性名来对应，不根据顺序对应 bar： bar foo: foo
            // let {baz} = {bar: 'bar', bas: 'bas'}; // 编译不通过，如果编译通过，则baz的值为undefined
        }
        {
            // 上面的写法等同于
            let {foo: foo, bar: bar} = {bar: 'bar', foo: 'foo'};// 上面的写法是这种写法的简写形式
        }
        {
            // 对象解构赋值时，如果要赋值的变量名与对象中的属性名不能对应，则，必须使用详细的写法
            // 这种写法相当于声明了baz，b，所以，baz和b不能在此之前或之后声明，否则报错
            let {foo: baz, bar: b} = {foo: 'foo', bar: 'bar'}; // baz: foo b: bar

        }
        {
            // 对象解构的嵌套使用
            let {p: [x, {y}]} = {p:['hello', {y:'world'}]}; // 相当于声明了x ,y 两个变量，分别赋值为 hello world
        }
        {
            // 解构赋值的默认值与数组类似
            let x;
            ({x=9} = {x:undefined}); // x = 9
            // 圆括号配合解构赋值, 没有卵用，但是合法的表达式
            ({} = [true, false]);
            ({} = 'a');
            ({} = [])
        }
        {
            // 解构赋值的用途
            // 1. 方便的使用已定义的对象的方法
            let {abs, floor, ceil} = Math;// 编译成es5之后： var abs = Math.abs, floor = Math.floor, ceil = Math.ceil;
            console.log(abs, floor, ceil);
            // 2. 数组取值的巧妙使用 -- > 对数组进行对象解构
            let arr = [1,2,3];
            let {0: first, [arr.length - 1]: last} = arr; // 其中[arr.length - 1] 是属性名表达式，不能用圆括号！！ first = 1，last = 3
        }
        {
            // 字符串的解构赋值
            // let [a,b,c,d,e] = 'hello'; // 在typescript环境下报错// 不过可以强行编译
            let {length: len} = 'hello';
            console.log('len:', len);
        }
        {
            // 函数参数的解构赋值
            let add = function([x,y]){
                let res = x + y;
                console.log(res);
                return res;
            };
            add([1,2]); // 表面上传递了一个数组作为参数，实际上，是传入了 x = 1, y = 2这两个参数
            // 解析成es5之后，是将add的参数当成一个数组来处理的
        }
        {
            // 来一个复杂一点的例子
            let a = [[1,3], [2,4]];
            let b = a.map(([a,b]) => a + b);
            console.log(a, b);
        }
        {
            // 函数参数的解构赋值
            let move = function({x=1,y=1} = {}){
                return [x, y];
            };
            let a = move({x: 3, y: 8}); // [3, 8]
            console.log(a);
            let b = move({x: 3}); // [3, 1]
            console.log(b);
            let c = move({}); // [1, 1]
            console.log(c);
            let d = move(); // [1, 1]
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
            let x = 1, y = 2;
            [x,y] = [y, x]; // 交换两者的值
            // 2.函数返回数组或者对象时，可以通过解构赋值方便的取出返回值
            // 3.函数参数的定义，其实就是传入一个数组或者一个对象
            // 4.解构赋值提取对象的值
            let a = {
                id: 1,
                name: 'bob',
                fun: {
                    swim: 'good',
                    basket: 'bad'
                }
            };
            let {id, name, fun} = a;
            console.log(id, name, fun);
            // 5.函数参数的默认值
            let func = function(url, {
                ok = function(){
                    console.log(url);
                },
                cancel = function(){
                    console.log(name, title);
                },
                name = 'fu',
                title = 'title'
            }){
                ok();
                cancel();
            };
            func('1', {name: 'bob'});
            // 6.遍历Map结构
            // 7.输入模块的指定方法
            // const {SourceMapConsumer, SourceNode} = require('source-map');
        }
        {

            console.log('============================================字符串扩展');
            // 1.字符的unicode表示法
            let a = '\u0061';
            console.log(a);
            let b = '\uD824\uDFB7'
            console.log(b);

            // 表示一个字符的六种方法
            let z1 = 'z';
            let z2 = '\172';
            let z3 = '\x7a';
            let z4 = '\u007a';
            let z5 = '\u{7a}';
            let z6 = '\z';
        }
        {
            // 字符串的遍历器接口,可以正确识别大于\uFFFF 的码点
            for(let ch of 'foo'){
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
            let s = 'fuybooo';
            let sw = s.startsWith('f'); // typescript不支持？
            let ew = s.endsWith('b', 4);
            let includes = s.includes('oo');
            let rs = s.repeat(2);
            console.log(sw);
        }
        {
            // 模板字符串
            let s = `fuybooo`;
            let company = `thunder` + `soft`;
            let email = `${s}@${company}.com`;
            console.log(email);


            // sql语句的拼接
            let name = 'fuybooo';
            let id = '2333-2344-9944';
            let sql = `
                select * from t_topic where 
                id = '${id}'
                and name = '${name}'
            `;
            console.log('sql', sql);
        }
        {
            // 函数的扩展

            //1.函数的默认值
            // 双重默认值，调用fn的时候，可以不传第二个参数，传了第二个参数也可以不传method和dataType
            let fn = function(url, {method = 'get', dataType = 'json'} = {}){
                console.log(arguments);
                console.log(url, method, dataType);
            };
            fn(1);
            fn(1, {method: 'post'});

        }
        {
            // 考察如下两个函数
            let fn1 = function({x=0,y=0}={}){
                return [x,y];
            };
            let fn2 = function({x,y}={x:0,y:0}){
                return [x,y];
            };
            console.log('不传值');
            console.log(fn1());
            console.log(fn2());
            console.log('都传值');
            console.log(fn1({x:3,y:8}));
            console.log(fn2({x:3,y:8}));
            console.log('都传空对象');
            console.log(fn1({}));
            console.log(fn2({}));
            console.log('都传错对象');
            console.log(fn1({z: 1}));
            console.log(fn2({z: 1}));
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
            function restricted(){
                // 'use strict';
                console.log(arguments);
                // console.log(restricted.arguments); 报错
                // console.log(restricted.caller); 报错
            }
            restricted();

        }
        {
            
        }

    });
});