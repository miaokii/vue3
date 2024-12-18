"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 申明unknown
let a;
a = false;
a = 'hello world';
let b;
// 报错，不能讲unknown类型赋值给b
// b = a
if (typeof (a) === 'string') {
    b = a;
}
b = a;
b = a;
// 报错
// a.toUpperCase()
// 限制函数返回值
function test(str) {
    throw Error('程序终止:' + str);
}
// object
// 声明对象类型
let person;
// 声明函数类型
// let count: (a: number, b: number) => number
// count = function (a: number, b: number): number {
//     return a + b
// }
// count = function (a, b) {
//     return a + b
// }
let arr1;
// 范形
let arr2;
let tuple1;
// 可选类型
let tuple2;
// 第一个元素是stirng，后面元素为任意多的number
let tuple3;
console.log(3 /* Direction.down */);
let p1;
p1 = 10;
function printStatus(status) {
    console.log(status);
}
printStatus(404);
printStatus('404');
function printGender(gender) {
    console.log(gender);
}
printGender('女');
const house = {
    height: 100,
    width: 100,
    city: '成都',
    street: 'chunxi',
    num: 22
};
// 返回非空值
const f1 = () => {
    return 100;
};
const f2 = () => 200;
const f3 = function () { };
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));
class Duck {
    fly() { }
    swim() { }
}
function logData(data) {
    console.log(data);
    return data;
}
logData('hello');
logData(33);
class Computer {
    constructor(brand, price, config) {
        this.brand = brand;
        this.price = price;
        this.config = config;
    }
}
let dell = new Computer('dell', 10000, {
    cpu: '14900k',
    gpu: '4090TI',
    ram: 64,
    rom: 1024,
    board: 'Z490 WIFI'
});
const test_js_1 = require("./test.js");
console.log((0, test_js_1.add)(1, 2));
console.log((0, test_js_1.mul)(2, 3));
