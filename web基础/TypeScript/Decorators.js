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
// class Person {
//     name: string
//     age: number
//      static school: string
//     constructor(name: string, age: number) { 
//         this.name = name
//         this.age = age
//     }
// }
// let value = 90
// // 使用defineProperty给Person添加age属性，并配置对应的get与set
// Object.defineProperty(Person.prototype, 'age', {
//     get() {
//         return value
//     },
//     set(val) {
//         value = val
//     }
// })
// const p = new Person('xiaoming', 20)
/**
 * 定义一个State属性装饰器，监视属性的修改
 */
// function State(target: object, propertyKey: string) {
//     let key = `__${propertyKey}`
//     Object.defineProperty(target, propertyKey, {
//         get() {
//             return this[key]
//         }, set(v) {
//             console.log(`${propertyKey}的最新值为: ${v}`);
//             this[key] = v
//         },
//         // 可枚举
//         enumerable: true,
//         // 可配置性
//         configurable: true
//     }) 
// }
// class Person {
//     name: string
//     @State age: number
//     static school: string
//     constructor(name: string, age: number) { 
//         this.name = name
//         this.age = age
//     }
// }
// const p = new Person('Hello', 12)
/**
 * 方法装饰器
 */
// /**
//  * 方法装饰器
//  * @param target 对于实例方法，是类的原型对象 ，对于类方法，是类本身
//  * @param propertyKey 方法名
//  * @param descriptor 方法的描述对象，其中value属性是被装饰的方法
//  */
// function Demo(target: object, propertyKey: string, descriptor:any) {
//     console.log(target, propertyKey, descriptor);
// }
// class Person {
//     constructor(
//         public name: string, 
//         public age: number
//     ) { }
//     @Demo speak() {
//         console.log(`I'm ${this.name}, I'm ${this.age} years old`);
//     }
//     @Demo static isAdult(age: number) {
//         return age >= 18
//     }
// }
/**
 * 方法装饰器使用
 */
// // 方法调用前后打印
// function Logger(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
//     // 存储原始方法
//     const originnal = descriptor.value
//     // 替换原始方法
//     descriptor.value = function (...args: any[]) {
//         let date1 = new Date()
//         console.log(`${propertyKey}方法开始执行`);
//         // 调用原始方法，call一个一个传递参数
//         let result = originnal.call(this, ...args)
//         console.log(`${propertyKey}方法执行完毕`);
//         let date2 = new Date()
//         let ms = date2.getMilliseconds() - date1.getMilliseconds()
//         console.log(`${propertyKey}方法执行时长：${ms}ms`);
//         return result
//     }
// }
// // 验证数据
// function Validate(maxValue: number) {
//     return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
//         // 保存原始方法
//         let originnal = descriptor.value
//         // 替换原始方法
//         descriptor.value = function(...args: any[]) {
//             // 验证逻辑
//             if (args[0] > maxValue) {
//                 throw new Error('年龄非法')
//             } 
//             // 调用原始方法，apply传递一个数组参数
//             return originnal.apply(this, args)
//         }
//     }
// }
// class Person {
//     constructor(
//         public name: string,
//         public age: number
//     ) { }
//     @Logger speak() {
//         console.log(`I'm ${this.name}, I'm ${this.age} years old`);
//     }
//     @Validate(120) static isAdult(age: number) {
//         return age >= 18
//     }
// }
// let p = new Person('xiaoming', 19)
// p.speak()
// console.log(Person.isAdult(20));
// console.log(Person.isAdult(122));
// /**
//  * 访问器装饰器
//  * @param target 对于实例访问器，值是类的原型对象，对于静态访问器，值是所属类
//  * @param propertyKey 访问器名称
//  * @param descriptor 描述对象
//  */
// function Demo(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
// }
// class Person {
//     get adderss() {
//         return '天府软件园'
//     }
//     static get country() {
//         return '中国'
//     }
// }
/**
 * 访问器装饰器应用
 * 对Weather类的temp属性的set访问器进行限制，最低温迪-50度，最高温度50度
 */
// function RangeValidate(max: number, min: number) {
//     return function (target: object, propertyKey: string, descriptor: PropertyDescriptor)  {
//         // 原始setter
//         const originnalSetter = descriptor.set
//         // 重写setter
//         descriptor.set = function(value: number) {
//             // 值不在范围内，抛出异常
//             if (value < min || value > min) {
//                 throw new Error(`${propertyKey}的值应该在${min}和${max}之间`)
//             } 
//             // 复合范围，调用原始setter
//             if (originnalSetter) {
//                 originnalSetter.call(this, value)
//             }
//         }
//     }
// }
// class Weather {
//     private _temp: number
//     constructor(_temp: number) {
//         this._temp = _temp
//     } 
//     @RangeValidate(-50, 50)
//     set temp(value) {
//         this._temp = value
//     }
//     get temp() {
//         return this._temp
//     }
//  }
// const w = new Weather(20)
// w.temp = 200
/**
 * 参数装饰器
 */
// /**
//  * 参数装饰器
//  * @param target 如果修饰的是实例方法的参数，target为类的原型对象，如果修饰的是静态方法的参数，target值为类本身
//  * @param propertyKey 参数所在方法的名称
//  * @param parameterIndex 参数在函数参数列表中的索引
//  */
// function Demo(target: object, propertyKey: string, parameterIndex: number) {
// }
// class Person {
//     constructor(public name: string) {}
//     speak(@Demo msg1: any, msg2: any) {
//         console.log(`${this.name} say：${msg1}, ${msg2}`);
//     }
// }
/**
 * 定义方法装饰器Validate，同时搭配参数装饰器NotNumber，对speak的参数类型进行限制
 *
 */ 
