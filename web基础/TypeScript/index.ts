// 申明unknown
let a: unknown

a = false
a = 'hello world'

let b: string
// 报错，不能讲unknown类型赋值给b
// b = a

if (typeof (a) === 'string') {
    b = a
}

b = a as string
b = <string>a

// 报错
// a.toUpperCase()

// 限制函数返回值
function test(str: string): never {
    throw Error('程序终止:' + str)
}


// object
// 声明对象类型
let person: { name: string, age?: number, [key: string]: any }
// 声明函数类型
// let count: (a: number, b: number) => number
// count = function (a: number, b: number): number {
//     return a + b
// }

// count = function (a, b) {
//     return a + b
// }

let arr1: number[]
// 范形
let arr2: Array<number>

let tuple1: [string, number]
// 可选类型
let tuple2: [string, boolean?]
// 第一个元素是stirng，后面元素为任意多的number
let tuple3: [string, ...number[]]


// 枚举
const enum Direction {
    left,
    right,
    up,
    down
}

console.log(Direction.down);

// 字符串枚举没有反向映射
// enum Direction {
//     up = 'up',
//     down = 'down',
//     left = 'left',
//     right = 'right'
// }

// console.log(Direction);


// type类型
type price = number;
let p1: price
p1 = 10

type Status = number | string
function printStatus(status: Status): void {
    console.log(status);
}

printStatus(404)
printStatus('404')

type Gender = '男' | '女'
function printGender(gender: Gender) {
    console.log(gender);
}

printGender('女')

type Area = {
    height: number
    width: number
}

type Address = {
    city: string
    street: string
    num: number
}

type House = Area & Address

const house: House = {
    height: 100,
    width: 100,
    city: '成都',
    street: 'chunxi',
    num: 22
}

// type

type LogFunc = () => void
// 返回非空值
const f1: LogFunc = () => {
    return 100
}
const f2: LogFunc = () => 200
const f3: LogFunc = function () { }

const src = [1, 2, 3]
const dst = [0]

src.forEach((el) => dst.push(el))

// 类

// class Person {
//     name: string
//     age: number
//     // 构造函数
//     constructor(name: string, age: number) {
//         this.name = name
//         this.age = age
//     }

//     speak() {
//         console.log(`我叫${this.name}, 今年${this.age}岁`);
//     }
// }

// class Student extends Person {
//     grade: string
//     // 构造器
//     constructor(name: string, age: number, grade: string) {
//         // 调用父构造器
//         super(name, age)
//         this.grade = grade
//     }
//     study() {
//         console.log(`我叫${this.name}, 我正在学习`);
//     }
//     // 重写父类方法
//     override speak(): void {
//         console.log(`我是学生，我叫${this.name}, 今年${this.age}岁`);
//     }
// }


// 属性简写

// class Person {
//     constructor(
//         // 共有
//         public name: string,
//         public age: number,
//         // 受保护，内部和子类
//         protected idCard: string,
//         // 私有
//         private height: number
//     ) { }
// }


// // 抽象类，包裹
// abstract class Package {
//     // 构造方法
//     constructor(public weight: number) {}
//     // 抽象方法，计算运费
//     abstract calculate():number
//     // 具体实现方法
//     printPackage() {
//         console.log(`包裹重量：${this.weight}kg，运费${this.calculate()}元`);        
//     }
// }

// // 继承抽象类，标准快递
// class StandardPackage extends Package {
//     constructor(
//         weight: number, 
//         //单价
//         public unitPrice: number
//     ) {
//         super(weight)
//     }

//     // 实现抽象方法
//     calculate(): number {
//         return this.weight * this.unitPrice
//     }
// }

// let package1 = new StandardPackage(20,5)
// package1.printPackage() 

// // 特快专递
// class ExpressPackage extends Package {
//     constructor(
//         weight: number,
//         // 首重单价
//         public unitPrice: number,
//         // 超出首重单价
//         public additional: number
//     ) {
//         super(weight)
//     }

//     calculate(): number {
//         if (this.weight > 10) {
//             return 10 * this.unitPrice + (this.weight - 10) * this.additional
//         } else {
//             return this.weight * this.unitPrice
//         }
//     }
// }

// let package2 = new ExpressPackage(15, 5, 2)
// package2.printPackage()


// 接口
// interface PersonInterface {
//     name: string
//     age: number
//     readonly gender?: string
//     speak(n: number): void
// }

// // 类实现接口
// class Person implements PersonInterface {
//     constructor(
//         public name: string,
//         public age: number
//     ){}

//     speak(n: number): void {
//         console.log(`name: ${this.name}, age: ${this.age}, speak: ${n}`)
//     }
// }

// // 对象实现接口
// const user: PersonInterface = {
//     name: '章三',
//     age: 23,
//     speak(n) {
//         console.log(`name: ${this.name}, age: ${this.age}, speak: ${n}`)
//     },
// }

// // 定义函数接口
// interface CountInterface {
//     (a: number, b: number): number
// }

// const count: CountInterface = (x, y) => x + y
// let c = count(1, 2)

// // 接口之间的继承
// interface StudentInterface extends PersonInterface {
//     // 年级
//     grade: string
// }

// const student: StudentInterface = {
//     name: '小明',
//     age: 22,
//     grade: '一年级',

//     speak(n) {

//     },
// }

// 接口的合并，可重复性
// interface PersonInterface {
//     id: string
// }

// const p: PersonInterface = {
//     name: 'xx',
//     age: 23, 
//     id: '12234',
//     speak(n) {},
// }


// interface和type的区别
// 都可以定义对象结构
//      interface更专注定义对象和类的结构，支持继承和合并
//      type可以定义类型别名，联合类型，交叉类型，不支持继承和自动合并

// interface PersonInterface {
//     name: string
//     age: number
//     id?: string
//     walk(): void
// }

// type PersonType = {
//     name: string
//     age: number
//     id?: string
//     walk(): void
// }

// let xiaoming: PersonInterface = {
//     name: 'xiaoming',
//     age: 20,
//     walk() { },
// }

// let xiaowang: PersonType = {
//     name: 'xiaowang',
//     age: 20,
//     walk() { },
// }


// type实现交叉类型
// type PersonType = {
//     name: string
//     age: number
//     id?: string
//     walk(): void
// } & {
//     speak(): void
// }

// type StudentType = PersonType & {
//     grade: string
// }


// 类实现多个接口

interface FlyInterface {
    fly(): void
}

interface SwimInterface {
    swim(): void
}

class Duck implements FlyInterface, SwimInterface {
    fly(): void {}
    swim(): void {}
}

function logData<T>(data:T): T {
    console.log(data);
    return data
}

logData<string>('hello')
logData<number>(33)

interface StudentInterface<T> {
    grade: number
    rankNum: number
    info: T
}

type ComputerConfig = {
    cpu: string
    gpu: string
    ram: number
    rom: number
    board: string
}

class Computer<T> {
    constructor(
        public brand: string,
        public price: number,
        public config: T
    ){}
}

let dell = new Computer<ComputerConfig>('dell', 10000, {
    cpu: '14900k',
    gpu: '4090TI',
    ram: 64,
    rom: 1024,
    board: 'Z490 WIFI'
})

import { add, mul } from "./test.js"

console.log(add(1, 2));
console.log(mul(2, 3));
