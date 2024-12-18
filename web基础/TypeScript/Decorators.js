"use strict";
/**
 * 类装饰器
 */
// /**
//  * Demo函数会在Person定义的时候执行
//  * @param target 被装饰的类
//  */
// function Demo(target: Function) {
//     console.log(target);
// }
// @Demo
// class Person {
//     name: string
//     age: number
//     constructor(name: string, age: number) {
//         this.name = name
//         this.age = age
//     }
// }
/**
 * 定义一个装饰器，实现Person实例调用toString时返回JSON.stringify的执行结果
 */
// 使用装饰器重写toString方法+封闭原型对象
// function CustomString(target: Function) {
//     // 向被装饰类的原型对象上添加自定义的toString方法
//     target.prototype.toString = function () {
//         return JSON.stringify(this)
//     }
//     // 封闭原型对象，禁止随意操作原型对象
//     Object.seal(target.prototype)
// }
// // 使用装饰器
// @CustomString
// class Person {
//     constructor(
//         public name: string,
//         public age: number
//     ) { }
// }
// let p1 = new Person('小明', 29)
// console.log(p1.toString());
// 
// interface Person {
//     x: number
// }
// Person.prototype.x = 99
// console.log(p1.x);
/**
 * 如果类装饰器返回了一个新类，新类将替换被装饰的类
 */
// function Demo(target: Function) {
//     return class {
//         test() {
//             console.log('World');
//         }
//     }
// }
// @Demo
// class Test {
//     test() {
//         console.log(100);
//     }
// }
/**
 * 声明构造类型
 */
// /**
//  * new      表示：该类型是可以用new操作符调用
//  * ...args  表示：构造器可以接受【任意数量】的参数
//  * any[]    表示：构造器可以接受【任意类型】的参数 
//  * {}       表示：返回类型是对象（非null、非undefined对象）
//  */
// type Constructor = new(...args: any[]) => {}
// // fn是一个类
// function test(fn: Constructor) {}
// @test
// class Person {}
/**
 * 申明构造类型+指定静态属性
 */
// type Constructor = {
//     // 构造签名
//     new(...args: any[]): {};
//     // 静态属性
//     idCard: string;
// }
// // fn是一个类
// function test(fn: Constructor) {}
// @test
// class Person {
//     static idCard: string
// }
/**
 * 构造器替换被装饰的类
 */
// 构造器，可以用new关键字实例化
// type Constructor = new (...args: any[]) => {}
// interface Person {
//     getTime(): Date
// }
// function LogTime<T extends Constructor>(target: T) {
//     return class extends target {
//         private createTime: Date
//         constructor(...args: any[]){
//             super(...args)
//             this.createTime = new Date()
//         }
//         getTime() {
//             return this.createTime
//         }
//     }
// }
// @LogTime
// class Person {
//     name: string
//     age: number
//     constructor(name: string, age: number) {
//         this.name = name
//         this.age = age
//     }
//     speak() {
//         console.log(`Hello，I'm ${this.name}`);
//     }
// }
// let p1 = new Person('xiaoming', 23)
// console.log(p1, p1.getTime());
/**
 * 装饰器工厂是一个返回装饰器函数的函数，可以为装饰器添加参数，可以更灵活的控制装饰器的行为
 *
 * 需求：定义一个LogInfo类装饰器工厂，实现Person实例可以调用到introduce方法，且introduce中输出内容的次数，由LogInfo接收的参数决定
 */
// interface Person {
//     introduce():void
// }
// // 装饰器工厂，再包装一层
// function LogInfo(count: number) {
//     // 返回装饰器
//     return function (target: Function) {
//         // 添加方法
//         target.prototype.introduce = function () {
//             for (let i = 0; i < count; i++) {
//                 console.log(`名字：${this.name}，年龄：${this.age}`);
//             }
//         }
//     }
// }
// @LogInfo(3)
// class Person {
//     constructor(public name: string, public age: number) { }
//     speak() {
//         console.log(`Hello，I'm ${this.name}`);
//     }
// }
// let p = new Person('xiaoming', 12)
// p.introduce()
/**
 * 组合装饰器
 *
 * 装饰器可以组合使用，执行顺序先【由上到下】的执行所有装饰器工厂，以此获取到装饰器，然后再【由下到上】执行所有装饰器
 *
 */
// // 装饰器1
// function test1(target: Function) {
//     console.log('test1');
// }
// // 装饰器2工厂
// function test2() {
//     console.log('test2工厂');
//     return function (target: Function) {
//         console.log('test2');
//     }
// }
// // 装饰器3工厂
// function test3() {
//     console.log('test3工厂');
//     return function (target: Function) {
//         console.log('test3');
//     }
// }
// // 装饰器4
// function test4(target: Function) {
//     console.log('test4');
// }
// @test1
// @test2()
// @test3()
// @test4
// class Person {}
/**
 * 组合装饰器应用
 */
// // 装饰器 
// function CustomString(target: Function) {
//     // 向被装饰类的原型对象上添加自定义的toString方法
//     target.prototype.toString = function () {
//         return JSON.stringify(this)
//     }
//     // 封闭原型对象，禁止随意操作原型对象
//     Object.seal(target.prototype)
// }
// // 装饰器工厂，再包装一层
// function LogInfo(count: number) {
//     // 返回装饰器
//     return function (target: Function) {
//         // 添加方法
//         target.prototype.introduce = function () {
//             for (let i = 0; i < count; i++) {
//                 console.log(`名字：${this.name}，年龄：${this.age}`);
//             }
//         }
//     }
// }
// type Constructor = new(...args: any[]) => {}
// function LogTime<T extends Constructor>(target: T) {
//     return class extends target {
//         private createTime: Date
//         constructor(...args: any[]){
//             super(...args)
//             this.createTime = new Date()
//         }
//         getTime() {
//             return this.createTime
//         }
//     }
// }
// @CustomString
// @LogInfo(5)
// @LogTime
// class Person {
//     constructor(public name: string, public age: number) { }
//     speak() {
//         console.log(`Hello，I'm ${this.name}`);
//     }
// }
// interface Person {
//     introduce():void
//     getTime(): void
// }
// const p = new Person('xiaoming', 12)
// p.speak()
// p.toString()
// p.introduce()
// console.log(p.getTime())
/**
 * 属性装饰器
 */
// /**
//  * 属性装饰器
//  * @param target 对于静态属性来说值是类，对于实例属性来说值是类的原型对象
//  * @param propertyKey 属性名
//  */
// function Demo(target: object, propertyKey: string) {
//     console.log(target, propertyKey);
// }
// class Person {
//     @Demo name: string
//     @Demo age: number
//     @Demo  static school: string
//     constructor(name: string, age: number) { 
//         this.name = name
//         this.age = age
//     }
// }
/**
 * 属性遮蔽
 */
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let value = 90;
// 使用defineProperty给Person添加age属性，并配置对应的get与set
Object.defineProperty(Person.prototype, 'age', {
    get() {
        return value;
    },
    set(val) {
        value = val;
    }
});
const p = new Person('xiaoming', 20);
console.log(p.age);
console.log(Person.prototype.age);
