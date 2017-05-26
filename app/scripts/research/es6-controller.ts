define(function (require) {
    var app = require('app');
    var $ = require('jquery');
    app.controller('ES6Controller', function (dataService) {
        // dataService.get('es6');
        console.log('===============================正式开始typescript,同时也包含ES6==========');
        //
        // // 布尔值
        // let isDone: boolean = false;
        // // 数字
        // let num: number = 1;
        //
        // let decLiteral: number = 10; // 十进制
        // let hexLiteral: number = 0xf00d;//十六进制
        // let binaryLiteral: number = 0b1001; // 二进制
        // let octalLiteral: number = 0o744; // 八进制
        //
        // // 字符串
        // let str1: string = 'bob';
        // str1 = 'fu';
        // let name: string = `bob`;
        // let age: number = 26;
        // let sentence: string = `Hello, my name is ${ name },
        //                         I'll be ${ age + 1 } years old next month.`;
        // console.log(sentence);
        //
        // // 数组
        // let list: number[] = [1,2,3];
        // // 数组泛型
        // let listE: Array<number> = [1,2,3];
        //
        // // 元组 Tuple
        // let x: [string, number];
        // x = ['ok', 1];
        // console.log(x[0]);
        //
        // // 枚举 enum
        // enum Color {red, green, blue};
        // let c: Color = Color.blue;
        // console.log('枚举类型值:', c);
        // let colorName: string = Color[2];
        // console.log('colorName:', colorName);
        //
        // // 任意值
        // let notSure: any = 4;
        // notSure = 'maybe a string instead';
        // notSure = false;
        //
        // // 空值
        // let unusable: void = undefined; // void类型的值只能是undefined或者null
        // // null 和 undefined
        // let n: null = null;
        // let u: undefined = undefined;
        //
        // // never 类型,无法到达终点的函数的返回值类型?
        // function e(m: string): never{
        //     throw new Error(m); // 此处无法返回任何值,即无法到达终点
        // }
        // function fail(){
        //     return error('error');// 返回值类型为never
        // }
        // function infiniteLoop(): never{
        //     while(true){
        //
        //     }
        // }
        //
        // // 类型断言: 尖括号 法
        // let someValue: any = 'this is a string';
        // let strLength: number = (<string>someValue).length;
        //
        // // as
        // let someV: any = 'this is a string';
        // let strL: number = (someV as string).length;
        //
        // // what is let
        //
        // for(var i=0;i<10;i++){
        //     setTimeout(function(){console.log(i);}, 100);
        // }
        //
        // for(let i=0; i<10;i++){
        //     setTimeout(function(){console.log(i);}, 100);
        // }
        //
        // // 解构
        // // 数组的解构赋值
        // let input = [1,2];
        // let [first, second] = input;
        // console.log(first, second);
        // // 解构赋值 替换两个变量的值
        // [first, second] = [second, first];
        // console.log(first, second);
        //
        // // 作用于参数函数
        // function f1([first, second]: [number, number]){
        //     console.log(first, second);
        // }
        // f1(input);
        //
        // let [first, ...rest] = [1,2,3,4];
        // console.log('first:', first, '  rest:', rest);


        // // 对象解构
        let o = {
            a: 1,
            b: 2,
            c: 'fu'
        };
        let {a, b} = o;

        // ({a, b} = {a: 'fu', b: 101})
    });
});