// 注册新元素

// 新元素标签名必须包含一个-连字符
// 自定义元素继承自HTMLElement
// registerElement像浏览器注册元素，并返回一个创建该元素的构造器
// var xFoo = document.registerElement('x-foo')
// 等价于
var xFoo = document.registerElement('x-foo', {
    prototype: Object.create(HTMLElement.prototype)
});
document.body.appendChild(new xFoo())


// // 扩展新元素
// // 扩展自button元素
// var MegaButton = document.registerElement('mega-button', {
//     prototype: Object.create(HTMLButtonElement.prototype)
// })

// var megaButton = document.createElement('mega-button')
// megaButton.addEventListener('click', function(e) {
//     alert('Thanks!')
// })

// document.body.appendChild(megaButton)