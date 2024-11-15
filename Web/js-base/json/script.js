// 请求链接
let requestUrl = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
// 请求对象
var request = new XMLHttpRequest();
// 请求方法，请求地址必传
request.open('GET', requestUrl);
// 响应类型json
// request.responseType = 'json';
// 如果用text接受
// 解析时用JSON.parse(responseObj)转换成json
request.responseType = 'text';
// 发送请求
request.send();

// 请求返回数据
// 只有在请求成功时触发
request.onload = function() {
    // 获取相应
    // var heros = request.response;
    let heros = JSON.parse(request.response);
    // 设置header信息
    populateHeader(heros);
    // 设置信息卡片
    showHeros(heros);
}

let header = document.querySelector('header');
let section = document.querySelector('section');

function populateHeader(jsonObj) {
    let h1 = document.createElement('h1');
    h1.textContent = jsonObj['squadName'];
    header.appendChild(h1);

    let para = document.createElement('p');
    para.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(para);
}

function showHeros(jsonObj) {
    let heroes = jsonObj['members'];
    for (let i = 0; i < heroes.length; i++) {
        var article = document.createElement('article');
        var h2 = document.createElement('h2');
        h2.textContent = heroes[i].name;
        var p1 = document.createElement('p');
        p1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        var p2 = document.createElement('p');
        p2.textContent = 'Age: ' + heroes[i].age;
        var p3 = document.createElement('p');
        p3.textContent = 'Superpowers';

        var ul = document.createElement('ul');
        var powers = heroes[i].powers;

        powers.forEach(power => {
            let li = document.createElement('li');
            li.textContent = power;
            ul.appendChild(li);
        });

        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        article.appendChild(ul);

        section.appendChild(article);
    }
}