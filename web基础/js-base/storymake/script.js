let nameField = document.querySelector('.nameField');
let puItem = document.querySelector('.puField');
let submitBtn = document.querySelector('.submit');
let joker = document.querySelector('.joker');

let namePlace = nameField.placeholder;

let str = '今天气温 34 摄氏度，:inserta:出去遛弯。当走到:insertb:门前时，突然就:insertc:。人们都惊呆了，placeholder全程目睹但并没有慌，因为:inserta:是一个 130 公斤的胖子，天气又辣么热。';

let names = ['怪兽威利', '大老爹', '圣诞老人'];
let places = ['肯德基', '迪士尼乐园', '白宫'];
let things = ['自燃了', '在人行道化成了一坨泥', '变成一条鼻涕虫爬走了'];

let rtem = ' 34 摄氏度';
let rkg = ' 130 公斤';
let rname = ':inserta:';
let rplace = ':insertb:';
let rthing = ':insertc:';
let ruser = 'placeholder';


function submitAction() {
    // 用户名
    let userName = nameField.value;
    // 是否选中公制
    let checkPu = puItem.checked;

    if (userName.length === 0) {
        userName = namePlace;
    }

    function randomValueFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    let name = randomValueFromArray(names);
    let place = randomValueFromArray(places);
    let thing = randomValueFromArray(things);


    let jok = str;
    jok = jok.replace(rname, name);
    jok = jok.replace(rname, name);
    jok = jok.replace(rplace, place);
    jok = jok.replace(rthing, thing);
    if (!checkPu) {
        jok = jok.replace(rtem, ' 95 华氏度');
        jok = jok.replace(rkg, ' 309 磅');
    }

    jok = jok.replace(ruser, userName);

    nameField.value = '';
    nameField.focus();

    joker.textContent = jok;
    joker.style.visibility = 'visible';
}

submitBtn.addEventListener('click', submitAction);