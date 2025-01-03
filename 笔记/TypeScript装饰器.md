
# TS装饰器

## 简介

1. 装饰器是一种特殊的函数，他可以对类、对象、属性、方法进行扩展，同时让代码更简洁
2. 装饰器时实验性特性，需要手动调整配置，来开启装饰器支持
3. 装饰器有5种：
   1. 类装饰器
   2. 属性装饰器
   3. 方法装饰器
   4. 访问器装饰器
   5. 参数装饰器

## 类装饰器

### 基本语法

类装饰器是应用在类声明上的函数，可以为类添加额外的功能，或添加额外的逻辑

```typescript
/**
 * Demo函数会在Person定义的时候执行
 * @param target 被装饰的类
 */
function Demo(target: Function) {
    console.log(target);
}

@Demo
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

// 等价于
// Demo(Person)
```

### 应用举例

定义一个装饰器，实现Person实例调用toString时返回JSON.stringify的执行结果

```typescript
// 使用装饰器重写toString方法+封闭原型对象
function CustomString(target: Function) {
    // 向被装饰类的原型对象上添加自定义的toString方法
    target.prototype.toString = function () {
        return JSON.stringify(this)
    }
    // 封闭原型对象，禁止随意操作原型对象
    Object.seal(target.prototype)
}

// 使用装饰器
@CustomString
class Person {
    constructor(
        public name: string,
        public age: number
    ) { }
}

let p1 = new Person('小明', 29)
console.log(p1.toString());

// 忽略编译器错误
interface Person {
    x: number
}
Person.prototype.x = 99
// 报错，禁止随意修改原型对象
console.log(p1.x);
```

### 关于返回值

- 类装饰器有返回值：若类装饰器返回一个新的类，这个新类将替换掉被装饰的类
- 类装饰器无返回值：若类装饰器无返回值或返回undefined，装饰类不会被替换

```typescript
/**
 * 如果类装饰器返回了一个新类，新类将替换被装饰的类
 */
function Demo(target: Function) {
    return class {
        test() {
            console.log('World');
        }
    }
}

@Demo
class Test {
    test() {
        console.log(100);
    }
}
```

### 关于构造类型

TS中，Function类型表示的范围十分广泛，包括：普通函数、剪头函数、方法等。但并非Function类型的函数都可以被new实例化，例如剪头函数不能被实例化。所以使用TS如何声明一个构造类型，如下：

#### 仅声明构造类型

```typescript
/**
 * new      表示：该类型是可以用new操作符调用
 * ...args  表示：构造器可以接受【任意数量】的参数
 * any[]    表示：构造器可以接受【任意类型】的参数 
 * {}       表示：返回类型是对象（非null、非undefined对象）
 */
type Constructor = new(...args: any[]) => {}
// fn是一个类
function test(fn: Constructor) {}
@test
class Person {}
```

#### 申明构造类型+指定静态属性

```typescript
/** 
 * 申明构造类型+指定静态属性
 */
type Constructor = {
    // 构造签名
    new(...args: any[]): {};
    // 静态属性
    idCard: string;
}
function test(fn: Constructor) {}
@test
class Person {
    static idCard: string
}
```

### 替换被装饰的类

对于高级的装饰器，不仅仅是覆盖一个原型上的方法，还可能添加新的方法和状态

> 需求：创建一个LogTime装饰器，可以给实例添加一个属性，用于记录实力对象创建的时间，在添加一个方法用于读取创建时间

```typescript
// 构造器，可以用new关键字实例化，自定义类型class
type Constructor = new (...args: any[]) => {}

// Person接口
interface Person {
    getTime(): Date
}

// 创建构造器，为类添加日志和创建时间
function LogTime<T extends Constructor>(target: T) {
    return class extends target {
        private createTime: Date
        constructor(...args: any[]){
            super(...args)
            this.createTime = new Date()
        }
        // 返回时间
        getTime() {
            return this.createTime
        }
    }
}

@LogTime
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    speak() {
        console.log(`Hello，I'm ${this.name}`);
    }
}

let p1 = new Person('xiaoming', 23)
console.log(p1, p1.getTime());
```

### 装饰器工厂

装饰器工厂是一个返回装饰器函数的函数，可以为装饰器添加参数，可以更灵活的控制装饰器的行为

> 需求：定义一个LogInfo类装饰器工厂，实现Person实例可以调用到introduce方法，且introduce中输出内容的次数，由LogInfo接收的参数决定

```typescript
interface Person {
    introduce():void
}

// 装饰器工厂，再包装一层
function LogInfo(count: number) {
    // 返回装饰器
    return function (target: Function) {
        // 添加方法
        target.prototype.introduce = function () {
            for (let i = 0; i < count; i++) {
                console.log(`名字：${this.name}，年龄：${this.age}`);
            }
        }
    }
}

@LogInfo(3)
class Person {
    constructor(public name: string, public age: number) { }
    speak() {
        console.log(`Hello，I'm ${this.name}`);
    }
}

let p = new Person('xiaoming', 12)
p.introduce()
```

### 装饰器组合

#### 执行顺序

装饰器可以组合使用，执行顺序先【由上到下】的执行所有装饰器工厂，以此获取到装饰器，然后再【由下到上】执行所有装饰器

```typescript
 
// 装饰器1
function test1(target: Function) {
    console.log('test1');
}

// 装饰器2工厂
function test2() {
    console.log('test2工厂');
    return function (target: Function) {
        console.log('test2');
    }
}

// 装饰器3工厂
function test3() {
    console.log('test3工厂');
    return function (target: Function) {
        console.log('test3');
    }
}

// 装饰器4
function test4(target: Function) {
    console.log('test4');
}


@test1
@test2()
@test3()
@test4
class Person {}

// 执行结果
// 先由上到下执行装饰器工厂，再由下到上执行装饰器
// test2工厂 test3工厂 test4 test3 test2 test1
```

#### 装饰器组合应用

```typescript

// 装饰器 
function CustomString(target: Function) {
    // 向被装饰类的原型对象上添加自定义的toString方法
    target.prototype.toString = function () {
        return JSON.stringify(this)
    }
    // 封闭原型对象，禁止随意操作原型对象
    Object.seal(target.prototype)
}

// 装饰器工厂，再包装一层
function LogInfo(count: number) {
    // 返回装饰器
    return function (target: Function) {
        // 添加方法
        target.prototype.introduce = function () {
            for (let i = 0; i < count; i++) {
                console.log(`名字：${this.name}，年龄：${this.age}`);
            }
        }
    }
}

type Constructor = new(...args: any[]) => {}
function LogTime<T extends Constructor>(target: T) {
    return class extends target {
        private createTime: Date
        constructor(...args: any[]){
            super(...args)
            this.createTime = new Date()
        }

        getTime() {
            return this.createTime
        }
    }
}

@CustomString
@LogInfo(5)
@LogTime
class Person {
    constructor(public name: string, public age: number) { }
    speak() {
        console.log(`Hello，I'm ${this.name}`);
    }
}

interface Person {
    introduce():void
    getTime(): void
}
const p = new Person('xiaoming', 12)
p.speak()
p.toString()
p.introduce()
console.log(p.getTime())
```

## 属性装饰器

### 语法

```typescript
/**
 * 属性装饰器
 * @param target 对于静态属性来说值是类，对于实例属性来说值是类的原型对象
 * @param propertyKey 属性名
 */
function Demo(target: object, propertyKey: string) {
    console.log(target, propertyKey);
}

class Person {
    @Demo name: string
    @Demo age: number
    @Demo  static school: string
    constructor(name: string, age: number) { 
        this.name = name
        this.age = age
    }
}
```

### 属性遮蔽

下面代码中，当构造器的`this.age = age`视图在实例上赋值时，实际上调用了原型上的`age`属性的`set`方法；如果p实例在给Person添加age属性前实例化，就不会调用`Person`原型对象的age属性

```typescript
class Person {
    name: string
    age: number
     static school: string
    constructor(name: string, age: number) { 
        this.name = name
        this.age = age
    }
}
let value = 90
// 使用defineProperty给Person添加age属性，并配置对应的get与set
Object.defineProperty(Person.prototype, 'age', {
    get() {
        return value
    },
    set(val) {
        value = val
    }
})
const p = new Person('xiaoming', 20)

// 当p先实例化时，调用结果为 20 90
// 当p后实例化时，调用结果为 20 20
console.log(p.age);
console.log(Person.prototype.age);
```

### 应用举例

定义一个State属性装饰器，监视属性的修改

```typescript
function State(target: object, propertyKey: string) {
    let key = `__${propertyKey}`
    Object.defineProperty(target, propertyKey, {
        get() {
            return this[key]
        }, set(v) {
            console.log(`${propertyKey}的最新值为: ${v}`);
            this[key] = v
        },
        // 可枚举
        enumerable: true,
        // 可配置性
        configurable: true
    }) 
}

class Person {
    name: string
    @State age: number
    static school: string
    constructor(name: string, age: number) { 
        this.name = name
        this.age = age
    }
}

const p = new Person('Hello', 12)
```

## 方法装饰器

### 语法

```typescript
/**
 * 方法装饰器
 * @param target 对于实例方法，是类的原型对象 ，对于类方法，是类本身
 * @param propertyKey 方法名
 * @param descriptor 方法的描述对象，其中value属性是被装饰的方法
 */
function Demo(target: object, propertyKey: string, descriptor:any) {
    console.log(target, propertyKey, descriptor);
    
}

class Person {
    constructor(
        public name: string, 
        public age: number
    ) { }

    @Demo speak() {
        console.log(`I'm ${this.name}, I'm ${this.age} years old`);
    }

    @Demo static isAdult(age: number) {
        return age >= 18
    }
}
```

### 应用

使用Logger装饰器方法执行的时间，使用Validate装饰器验证数据

```typescript
// 方法调用前后打印
function Logger(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // 存储原始方法
    const originnal = descriptor.value
    // 替换原始方法
    descriptor.value = function (...args: any[]) {
        let date1 = new Date()
        console.log(`${propertyKey}方法开始执行`);
        // 调用原始方法，call一个一个传递参数
        let result = originnal.call(this, ...args)
        console.log(`${propertyKey}方法执行完毕`);
        let date2 = new Date()

        let ms = date2.getMilliseconds() - date1.getMilliseconds()
        console.log(`${propertyKey}方法执行时长：${ms}ms`);

        return result
    }
}

// 验证数据
function Validate(maxValue: number) {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        // 保存原始方法
        let originnal = descriptor.value
        // 替换原始方法
        descriptor.value = function(...args: any[]) {
            // 验证逻辑
            if (args[0] > maxValue) {
                throw new Error('年龄非法')
            } 
            // 调用原始方法，apply传递一个数组参数
            return originnal.apply(this, args)
        }
    }
}

class Person {
    constructor(
        public name: string,
        public age: number
    ) { }

    @Logger speak() {
        console.log(`I'm ${this.name}, I'm ${this.age} years old`);
    }

    @Validate(120) static isAdult(age: number) {
        return age >= 18
    }
}

let p = new Person('xiaoming', 19)
p.speak()
console.log(Person.isAdult(20));
console.log(Person.isAdult(122));
```

## 访问器装饰器

### 语法

```typescript
/**
 * 访问器装饰器
 * @param target 对于实例访问器，值是类的原型对象，对于静态访问器，值是所属类
 * @param propertyKey 访问器名称
 * @param descriptor 描述对象
 */
function Demo(target: object, propertyKey: string, descriptor: PropertyDescriptor) {

}

class Person {
    get adderss() {
        return '天府软件园'
    }

    static get country() {
        return '中国'
    }
}
```

### 应用

对Weather类的temp属性的set访问器进行限制，最低温迪-50度，最高温度50度

```typescript
// 设置最高和最低温度
function RangeValidate(max: number, min: number) {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor)  {
        // 原始setter
        const originnalSetter = descriptor.set
        // 重写setter
        descriptor.set = function(value: number) {
            // 值不在范围内，抛出异常
            if (value < min || value > min) {
                throw new Error(`${propertyKey}的值应该在${min}和${max}之间`)
            } 
            // 复合范围，调用原始setter
            if (originnalSetter) {
                originnalSetter.call(this, value)
            }
        }
    }
}

class Weather {
    private _temp: number
    constructor(_temp: number) {
        this._temp = _temp
    } 

    // 访问装饰器
    @RangeValidate(-50, 50)
    set temp(value) {
        this._temp = value
    }

    get temp() {
        return this._temp
    }
 }

const w = new Weather(20)
w.temp = 200
```

## 参数装饰器

### 语法

```typescript
/**
 * 参数装饰器
 * @param target 如果修饰的是实例方法的参数，target为类的原型对象，如果修饰的是静态方法的参数，target值为类本身
 * @param propertyKey 参数所在方法的名称
 * @param parameterIndex 参数在函数参数列表中的索引
 */
function Demo(target: object, propertyKey: string, parameterIndex: number) {

}

class Person {
    constructor(public name: string) {}
    speak(@Demo msg1: any, msg2: any) {
        console.log(`${this.name} say：${msg1}, ${msg2}`);
    }
}
```

### 应用

```typescript
```