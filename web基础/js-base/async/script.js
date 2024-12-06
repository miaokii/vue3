// async放在函数声明之前
// await只在异步函数中才起作用，他会阻塞后面的代码，直到异步函数执行结束
// 在返回promise函数时使用await

async function hello() {
    return greeing = await Promise.resolve('Hello');
}

// hello().then(alert);

// 使用async/await重写promise代码
// async将myFetch函数转换为promise
async function myFetch(name) {
    try {
        let response = await fetch(name);
        let myBolb = await response.blob();

        let url = URL.createObjectURL(myBolb);
        let img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img);
        document.body.appendChild(document.createElement('br'));
    } catch (error) {
        console.log(error);
    }
}

myFetch('../promise/tea.jpg')
    .catch(e => {
        console.log('error load' + 'tea.jpg');
    });

async function fetchAndDecode(url, type) {
    let response = await fetch(url);
    if (type == 'blob') {
        return await response.blob();
    } else if (type == 'text') {
        return await response.text();
    } else {
        return response;
    }
}

async function displayContent() {
    let coffee = fetchAndDecode('../promise/coffee.jpg', 'blob');
    let tea = fetchAndDecode('../promise/tea.jpg', 'blob');
    let txt = fetchAndDecode('../promise/description.txt', 'text');

    let values = await Promise.all([coffee, tea, txt]);

    let coffeeurl = URL.createObjectURL(values[0]);
    let teaurl = URL.createObjectURL(values[1]);
    let textContent = values[2];

    let image1 = document.createElement('img');
    image1.src = coffeeurl;
    document.body.appendChild(image1);

    let image2 = document.createElement('img');
    image2.src = teaurl;
    document.body.appendChild(image2);

    let p = document.createElement('p');
    p.textContent = textContent;
    document.body.appendChild(p);
}

displayContent()
    .catch(e => {
        console.log(e);
    });