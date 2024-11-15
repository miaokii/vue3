// 中间状态，pending
let promise = fetch('coffee.jpg');

// 调用then会产生一个新的promiss
// promise创建时不是成功也不是失败的状态，此时状态为待定
// 当promise返回时，状态为 resolved 已解决
// 一个成功resolved的promise称为fullfilled实现
// 一个不成功的resolved的promise叫rejected拒绝，他将返回一个拒绝原因reason
promise
    .then(response => {
        if (!response.ok) {
            throw new Error(`Http Error! status: ${response.status}`);
        } else {
            // 返回promise
            return response.blob();
        }
    })
    .then(blob => {
        let obj = URL.createObjectURL(blob);
        let image = document.createElement('img');
        image.src = obj;
        let imgContainer = document.querySelector('.imgContainer');
        imgContainer.appendChild(image);
    }).catch(error => {
        console.log(error);
    });



// 多个promise

// 创建和区分promise的资源类型的函数
function fetchAndDecode(url, type) {
    return fetch(url)
        .then(response => {
            // 从响应的header中获取资源类型
            let contentType = response.headers.get('content-type');
            console.log(contentType);

            // type区分资源类型
            if (type === 'blob') {
                return response.blob();
            } else if (type == 'text') {
                return response.text();
            }
        }).catch(e => {
            console.log('fetch error:' + e.message);
        });
}

// 多个promise
let coffeePromise = fetchAndDecode('coffee.jpg', 'blob');
let tea = fetchAndDecode('tea.jpg', 'blob');
let text = fetchAndDecode('description.txt', 'text');

Promise.all([coffeePromise, tea, text])
    .then(values => {
        console.log(values);

        let coffeeurl = URL.createObjectURL(values[0]);
        let teaurl = URL.createObjectURL(values[1]);
        let textContent = values[2];

        let morePromise = document.querySelector('.morePromise');

        let image1 = document.createElement('img');
        image1.src = coffeeurl;
        morePromise.appendChild(image1);

        let image2 = document.createElement('img');
        image2.src = teaurl;
        morePromise.appendChild(image2);

        let p = document.createElement('p');
        p.textContent = textContent;
        morePromise.appendChild(p);
    })
    .catch(e => {
        console.log(e.message);
    })
    // 所有promise结束运行
    .finally(() => {
        console.log('所有promise运行结束');
    });


/// 创建自定义promise
/// reslove接受
/// reject拒绝
/// 包含拒绝条件的promise
function timeOutPromise(message, interval) {
    return new Promise((resolve, reject) => {
        if (message.length === 0 || typeof message !== 'string') {
            reject('Message is empty or not a number!');
        } else if (interval < 0 || typeof interval !== 'number') {
            reject('Interval is negative or not a number');
        } else {
            setTimeout(() => {
                resolve(message);
            }, interval);
        }
    });
}


let timeoutPromise = timeOutPromise('Hello World', 2000);

timeoutPromise
    .then(response => {
        alert(response);
    })
    .catch(e => {
        alert(e);
    })
    .finally(() => {
        console.log('自定义promise结束');
    });