// 字符串
let string = 'Hello World';
// 长度
let strlen = string.length;
// 查找子串，-1没找到
let index = string.indexOf('Hello');
// 提取字符串，从2开始，7结束，不包括7
let sub = string.slice(2, 7);
// 从2开始，到结束
let sub1 = string.slice(2);
// 转换大写
let upperstr = string.toUpperCase();
// 转换小写
let lowstr = string.toLowerCase();
// 替换
let replace = string.replace('World', 'My World');

// 数组
let arr = [1, 2, 3, 4, 5];
// 数组长度
arr.length;
// 转换字符串，可以指定链接符
let arrstr = arr.join(',');
// 转换字符串，链接符为,逗号
let arrstr1 = arr.toString();
// 字符串转换数组
arr = arrstr.split(',');

// 末尾添加元素，返回数组长度
let arrlength = arr.push(6);
// 末尾移除元素
arr.pop();

// 开始插入元素
arr.unshift(0);
// 开始移除元素
arr.shift();


// 创建一个对象，字典？？？
let obj = {};
// name属性值
obj.name = 'lucy';
// hello方法
obj.hello = function() {
    console.log('Hello ' + this.name);
};

// 创建一个Person类
function Person(name, age, phone) {
    // 属性
    this.name = name;
    this.age = age;
    this.phone = phone;

    // 方法
    this.hello = function() {
        // console.log('name: ' + this.name + "\n" + "age: " + this.age + '\n' + this.phone);
        console.log(this);
    };
}

// Person对象
let ming = new Person('ming', 20, '18839323333');
ming.hello();


function Person1(first, last, age, gender) {
    this.name = {
        'first': first,
        'last': last
    };
    this.age = age;
    this.gender = gender;

    this.bio = function() {
        console.log('My name is ' + this.name.first + ' ' + this.name.last + ', I am ' + this.age + ' years old');
    }
}

let p1 = new Person1('zhang', 'feng', 12, '男');
p1.bio();

// 使用object创建对象
let p2 = Object();
p2.name = 'kangkang';
p2.scholl = '一中';
p2.hello = function() {
    console.log(this.name, this.scholl);
}

p2.hello();

// create方法基于对象创建新对象
// let p3 = create(p1);
// p3.name = 'Lucy';
// p3.hello();

let dosomething = function() {};
console.log(dosomething.prototype);

console.log(Object.prototype);
console.log(p1.constructor);

// 继承, teacher继承自Person
function Teacher(name, age, phone, subject) {
    Person.call(this, name, age, phone);
    this.subject = subject;

    this.teach = function() {
        console.log('teach ' + this.name, ' subject: ' + this.subject);
    }
}

Person.prototype.greeting = function() {
    console.log('hello ' + this.name);
}

ming.greeting();
let t = new Teacher('kangkai', 22, '1993200222', '数学');
t.teach();
Teacher.prototype.greeting = function() {
    this.teach();
}
t.greeting();

// json 的字符串必须用双引号引用
let json = { "name": "kagnkai", "age": 38 };
console.log(json);
// JSON-> string
let jstring = JSON.stringify(json);
console.log(jstring);
// string -> JSON
let j = JSON.parse(jstring);
console.log(j);