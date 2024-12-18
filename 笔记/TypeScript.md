# TypeScript

## 1. 编译

### 1.1 命令行编译

将.ts文件编译为.js文件，需要配置TypeScript的编译环境

```shell
# 全局安装ts
npm i typescript -g
# 使用命令编译ts文件
tsc index.ts
```

### 1.2 自动化编译

在要编译的ts文件目录执行

 ```shell
#  创建TS编译控制文件
tsc --init
# 监视目录中ts文件的变化
tsc --watch
# 小优化，当编译出错时不生成.js文件，也可以在tsconfig.json中的noEmitOnError配置
tsc --noEmitOnError --watch
 ```

## 2. 数据类型

类型申明：

```typescript
// 字符串类型
let a: string
// 数值类型
let b: number
// 布尔类型
let c: boolean

// 字面量类型，只能存储hello字符串
let d: 'hello'
// 字面量类型，只能存储3
let e: 3

// 函数参数类型，返回值类型
function count(x: number, y: number): number {
    return x + y
}
```

## 3. 类型总览

### 3.1 JavaScript中的数据类型

- string
- number
- boolean
- null
- undefined
- bigint
- symbol
- object
  - object包含：Array、Function、Date、Error等

### 3.2 TypeScript中的数据类型

- js中的所有数据类型
- 6个新增的数据类型
  - any
  - nuknown
  - never
  - void
  - tuple
  - enum
- 两个用于自定义类型的方式
  - type
  - interface

> 在JS中的内置构造函数：`Number`，`String`等，用于创建对应的包装对象，日常开发很少使用；在TS中也是同理，所以在TS进行类型申明时，通常使用小写的`number`、`string`等

### 3.3 原始类型vs包装对象

- 原始类型：如`number`、`string`、`boolean`，在js中最简单的数据类型，在内存中占用极少，处理速度快
- 包装对象：如`Number`、`String`、`Boolean`对象，是复杂类型，在内存中占用更多的空间，很少自己创建包装对象
- 自动装箱：js在必要时会自动将原始类型包装成对象，以便调用方法和访问属性

```js
// 原始字符串
let str = 'Hello World'

// 访问str.length时，JS做了以下工作
let size = function() {
    // 1. 自动装箱：创建一个临时的String对象包装原始字符串
    let tempStringObj = new String(str)
    // 2. 访问String对象的length属性
    let lengthValue = tempStringObj.length
    // 3. 销毁临时对象，返回长度值
    // JS自动销毁对象，无感知
    return lengthValue
}

console.log(size);
```

## 4. 常用类型

### 4.1 any

`any`为任意类型，当设置变量为`any`类型时，放弃了编译器对变量的检查

```typescript
let a: string
let b: any
b = 4
// any类型变量b破坏了a的类型
a = b
```

> `any`类型的变量，可以赋值给任意类型的变量，所以不建议随意使用`any`类型

### 4.2 unknown

`unknown`时未知类型

1. 可以理解为一个类型安全的`any`，适用于不确定数据的具体类型
2. `unknown`在使用之前会强制安全检查，提供更强的类型安全性
3. 读取any类型的任何属性都不会报错，`unknown`正好相反

```typescript
// 申明unknown
let a: unknown

a = false
a = 'hello world'

// 报错，未知类型
a.toUpperCase()

let b: string
// 报错，不能讲unknown类型赋值给b
// b = a
// 1: 类型判断
if (typeof(a) === 'string') {
    b = a
}
// 2: 断言
b = a as string
// 3: 断言
b = <string>a
```

### 4.3 never

`never`任何值都不是，不能有值，`undefined`、`null`、`0`等任何值都不行

1. 几乎不用`never`去直接限制变量，没有意义
2. `never`一般是`ts`主动推断出来的
3. never也可以限制函数的返回值

```typescript
// 限制函数返回值
function test(str: string): never {
    throw Error('程序终止:' + str)
}
```

### 4.4 void

通常用于函数返回值的声明，含义：不返回任何值，调用者也不依赖返回值进行任何操作

> `void`是一个广泛的概念，用来表达‘空’，而`undeined`是这种‘空’的具体体现之一；因此可以说`undeined`是`void`能接受空状态的一种具体形式，换句话说，`void`包含`undefined`，但`void`表达的语义超过了单纯的`undeined`，他是意图上约定，而不仅仅是特定值的限制

若函数的返回值是void

- 从语法上讲：函数是可以返回`undefined`的，至于显示返回，还是隐式返回，无所谓！
- 从语义上讲：函数调用者不关心函数的返回的值，也不依赖返回值进行任何操作，即使返回了`undefined`值

### 4.5 object

#### 4.5.1 声明对象类型

实际开发中，限制对象类型，一般有以下形式

```typescript
// age是可选类型
let person: {name: string, age?: number}
// 可以用；分隔
let person: {name: string; age?: number}
// 可以用换行分隔
let person: {
    name: string
    age?: number
}

let p1 = {name: 'xiaoming', age: 1}
// 报错，没有gender类型的说明
let p2 = {name: 'xiaoming', age: 1, gender: '男'}
```

**索引签名**：允许定义对象可以具有任意数量的属性，这些属性的键和类型是可变的，常用语：描述类型不确定的属性，即具有动态属性的对象

```typescript
let person: {name: string, age?: number, [key: string]: any}
```

#### 4.5.2 声明函数类型

```typescript
let count: (a: number, b: number) => number
count = function(a: number, b: number): number {
    return a + b
}
// 简写形式，可以省略参数类型
count = function(a, b) {
    return a + b
}
```

**备注：**

- TypeScript中的=>在函数类型声明时表示函数类型，描述其参数类型和返回值类型
- JavaScript中的=>是一种定义函数的语法，是具体的函数实现
- 函数类型声明还可以使用：接口、自定义类型等方式

#### 4.5.3 声明数组类型

```typescript
let arr1: number[]
// 范形
let arr2: Array<number>
```

### 5. tuple

元组，是一种特殊的数据类型，可以存储固定数量的元素，每个元素的类型是已知的且可以不同，元组用于精确描述一组值的类型，？可以表示可选元素

```typescript
let tuple1: [string, number]
// 可选类型
let tuple2: [string, boolean?]
// 第一个元素是stirng，后面元素为任意多的number
let tuple3: [string, ...number[]]
```

### 6. enum

枚举可以定义一组**命名常量**，增强代码可读性，让代码更好维护

#### 6.1 数字枚举

数字枚举，其成员值会自动自增，且数字枚举还具备反向映射的特点，可以通过枚举的值获取成员名称

```typescript
enum Direction {
    // 可以指定枚举成员的值
    left = 5,
    right,
    up ,
    down
}

console.log(Direction.down);
console.log(Direction[1]);
```

#### 6.2 字符串枚举

枚举成员的值是字符串

#### 6.3 常量枚举

一中特殊枚举类型，使用const关键自定义，在编译时会被內联，避免生成一些额外代码

```typescript
const enum Direction {
    left,
    right,
    up ,
    down
}
console.log(Direction.down);

// 转换为js时
console.log(3 /* Direction.down */);
```

### 7. type

type可以为任意类型创建别名，让代码更简洁，可读性更强，同时更能方便的进行类型复用和扩展

#### 7.1 基本用法

定义基本类型别名

```typescript
type price = number
let p1: price
p1 = 10
```

#### 7.2 联合类型

联合类型是一种高级类型，表示一个值可以是集中不同类型之一

```typescript
// http状态码
type Status = number | string
function printStatus(status: Status): void {
    console.log(status);
}

printStatus(404)
printStatus('404')

// 性别
type Gender = '男' | '女'
function printGender(gender: Gender) {
    console.log(gender);
}

printGender('女')
```

#### 7.3 交叉类型

```typescript
// 面积
type Area = {
    height: number
    width: number
}
// 地址
type Address = {
    city: string
    street: string
    num: number
}
// 房子联合两个类型
type House = Area & Address

const house: House = {
    height: 100,
    width: 100,
    city: '成都',
    street: 'chunxi',
    num: 22
}
```

### 8. 特殊情况

使用类型声明限制函数返回值为void时，TS不会严格要求函数返回空

```typescript
type LogFunc = () => void
// 返回非空值
const f1: LogFunc = () => {
    return 100
}
const f2: LogFunc = () => 200
const f3: LogFunc = function () { }
```

**为什么会这样：**

为了使下面代码成立，Array.prototype.push返回一个数字，表示数组的长度，而Array.prototype.foreach方法期望回调的返回类型是void

> ```typescript
> const src = [1, 2, 3]
> const dst = [0]
> src.forEach( (el) => dst.push(el))
> ```

## 9. 类相关

```typescript
class Person {
    name: string
    age: number
    // 构造函数
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    speak() {
        console.log(`我叫${this.name}, 今年${this.age}岁`);
    }
}

class Student extends Person {
    grade: string
    // 构造器
    constructor(name: string, age: number, grade: string) {
        // 调用父构造器
        super(name, age)
        this.grade = grade
    }
    study() {
        console.log(`我叫${this.name}, 我正在学习`);
    }
    // 重写父类方法
    override speak(): void {
        console.log(`我是学生，我叫${this.name}, 今年${this.age}岁`);
    }
}
```

### 9.1 属性修饰符

|修饰符|含义|具体规则|
|:-|:-|:-|
|public|公开的|可以被：类内部、子类、类外部访问，默认修饰符|
|protected|受保护的|可以被：类内部、子类访问|
|private|私有的|可以被：类内部访问|
|readonly|只读的|属性无法修改，只能访问|

```typescript
// 类属性简写形式
class Person {
    constructor(
        // 公有，默认public修饰
        name: string,
        age: number,
        // 受保护，内部和子类
        protected idCard: string,
        // 私有
        private height: number
    ) { }
}
```

### 9.2 抽象类

> - **概述：** 抽象类是一种**无法被实例化**的类，专门用来定义类的**结构和行为**，类中可以写**抽象方法**，也可以写方法具体实现。抽象类主要用来**为其派生类提供一个基础结构**，要求派生类**必须实现**其中的抽象方法
> - **简记：** 抽象类**不能实例化**，可以**被继承**，抽象类内部有**普通方法**，也有**抽象方法**

实现一个抽象类，定义包裹重量和计算运费方法，打印包裹

```typescript
// 抽象类，包裹
abstract class Package {
    // 构造方法
    constructor(public weight: number) {}
    // 抽象方法，计算运费
    abstract calculate():number
    // 具体实现方法
    printPackage() {
        console.log(`包裹重量：${this.weight}kg，运费${this.calculate()}元`);        
    }
}
```

实现一个标准包裹，构造器多传入单价属性，并且实现calculate方法计算价格

```typescript
// 继承抽象类，标准快递
class StandardPackage extends Package {
    constructor(
        weight: number, 
        //单价
        public unitPrice: number
    ) {
        super(weight)
    }

    // 实现抽象方法
    calculate(): number {
        return this.weight * this.unitPrice
    }
}
let package1 = new StandardPackage(20,5)
package1.printPackage() 
```

实现特快包裹类，构造起添加一个超出首重的单价，并且实现calculate方法计算价格

```typescript
// 特快专递
class ExpressPackage extends Package {
    constructor(
        weight: number,
        // 首重单价
        public unitPrice: number,
        // 超出首重单价
        public additional: number
    ) {
        super(weight)
    }

    calculate(): number {
        if (this.weight > 10) {
            return 10 * this.unitPrice + (this.weight - 10) * this.additional
        } else {
            return this.weight * this.unitPrice
        }
    }
}
let package2 = new ExpressPackage(15, 5, 2)
package2.printPackage()
```

总结：如何使用抽象类：

1. 定义**通用接口**：为一组相关的类定义通用的行为（方法或属性）时
2. 提供**基础实现**：在抽象类中提供某些方法或为其提供基础实现，这样派生类就可以继承这些实现
3. 确保**关键实现**：强制派生类实现一些关键行为
4. **共享代码和逻辑**：当多个类需要共享公共部分代码时，抽象类可以避免代码重复

## 10. 接口

接口是**定义结构**的一种方式，主要作用是为类、对象、函数等规定一种契约，这样可以确保代码的一致性和类型安全，但接口只能定义格式，**不能包含任何实现**

### 定义类接口

```typescript
interface PersonInterface {
    name: string
    age: number
    readonly gender?: string
    speak(n: number): void
}

// 类实现接口
class Person implements PersonInterface {
    constructor(
        public name: string,
        public age: number
    ){}

    speak(n: number): void {
        console.log(`name: ${this.name}, age: ${this.age}, speak: ${n}`)
    }
}
```

### 10.1 对象接口

```typescript
// 对象实现接口
const user: PersonInterface = {
    name: '章三',
    age: 23,
    speak(n) {
        console.log(`name: ${this.name}, age: ${this.age}, speak: ${n}`)
    },
}
```

### 10.2 函数接口

```typescript
interface CountInterface {
    (a: number, b: number): number
}

const count: CountInterface = (x, y) => x + y
let c = count(1, 2)
```

### 10.3接口之间的继承 <a id = 'interface_entends'></a>

```typescript
interface StudentInterface extends PersonInterface {
    // 年级
    grade: string
}

const student: StudentInterface = {
    name: '小明',
    age: 22,
    grade: '一年级',
    speak(n) {},
}
```

### 10.4 接口的合并（重复定义）<a id = 'interface_union'></a>

```typescript
// 接口的合并，可重复性
interface PersonInterface {
    id: string
}
const p: PersonInterface = {
    name: 'xx',
    age: 23, 
    id: '12234',
    speak(n) {},
}
```

## 11. 相似概念的区别

### 11.1 interface和type的区别

- 相同点：interface和type都可以用于定义对象结构，二者在许多场景可以互换
- 不同点：
  - interface：更专注定义对象和类的结构，支持继承、合并
  - type：可以定义类型别名、联合类型、交叉类型，但不支持继承和自动合并

#### 11.1.1 interface和type都可以用于定义对象结构

```typescript
interface PersonInterface {
    name: string
    age: number
    id?: string
    walk(): void
}

type PersonType = {
    name: string
    age: number
    id?: string
    walk(): void
}

let xiaoming: PersonInterface = {
    name: 'xiaoming',
    age: 20,
    walk() { },
}

let xiaowang: PersonType = {
    name: 'xiaowang',
    age: 20,
    walk() { },
}
```

#### 11.1.2 interface可以继承和合并

[接口继承](#interface_entends)
[接口合并](#interface_union)

#### 11.1.3 typ的交叉类型

```typescript
type PersonType = {
    name: string
    age: number
    id?: string
    walk(): void
} & { 
    speak(): void
}

type StudentType = PersonType & {
    grade: string
}
```

### 11.2 interface与抽象类的区别

- 相同点：都用于定义一个类的格式（应该遵守的契约）
- 不同点：
  - interface：只能描述结构，不能有任何实现代码，一个类可以实现多个接口
  - 抽象类：既可以包含抽象方法，也可以包含具体方法实现，一个类只能继承一个抽象类

#### 11.2.1 类实现多个接口

```typescript
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
```

## 12. 泛型

泛型允许我们在定义函数、类或接口时，使用类型参数来表示为指定的类型，这些参数在具体使用时，才能指定具体类型，泛型能让同一段代码适用于多种类型，同时任然保持类型安全

一个泛型函数：

``` typescript
function logData<T>(data:T): T {
    console.log(data);
    return data
}
logData<string>('hello')
logData<number>(33)
```

一个泛型接口：

```typescript
interface StudentInterface<T> {
    grade: number
    rankNum: number
    info: T
}
```

一个泛型类：

```typescript
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
```

## 13. 类型声明文件

类型声明文件时TS的一种特殊文件，通常以`.d.ts`结尾，作为扩展名，主要作用是**为现有的JS代码提供类型信息**，是的TS能够在使用这些JS库或模块时**进行类型检查和提示**

```typescript
// 定义一个test.js文件
export function add(a, b) {
    return a + b
}

export function mul(a, b) {
    return a * b
}

// 在test.js同级目录创建test.d.ts文件
declare function add(a: number, b: number): number
declare function mul(a: number, b: number): number

export {add, mul}

// 在ts文件中使用add和mul
import { add, mul } from "./test.js"
// 编译器会提示add和mul的参数和返回值类型
console.log(add(1, 2));
console.log(mul(2, 3));
```
