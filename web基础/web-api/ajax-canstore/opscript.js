/// 类型选择
let selectEle = document.querySelector('select');
/// 产品网格
let goodView = document.querySelector('main')
    /// 筛选按钮
let filterBtn = document.querySelector('.filterBtn');
/// 搜索栏
let searchBar = document.querySelector('.searchKey');

let goods;

/// 获取产品数据
fetch('products.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        goods = json;
        classifyGoods();
    })
    .catch(console.log);

filterBtn.addEventListener('click', function() {
    let type = selectEle.value;
    let key = searchBar.value;
    queryGoos(type, key);
    searchBar.value = '';
})

/// 统计商品类型
function classifyGoods() {
    let types = ['All']
    goods.forEach(json => {
        let type = json['type'];
        if (types.indexOf(type) == -1) {
            types.push(type);
        }
    });

    types.forEach(type => {
        let option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        selectEle.appendChild(option);
    });

    queryGoos(types[0], '')
}

/// 根据商品类型，搜索key查询商品
function queryGoos(type, key) {

    // 清空产品
    goodView.innerHTML = '';
    let count = 0
    goods.forEach(good => {
        if (type === 'All') {
            if (key === '' || good['name'].indexOf(key) > -1) {
                createGood(good);
                count++;
            }
        } else {
            if (good['type'] === type && (good['name'].indexOf(key) > -1 || key === "")) {
                createGood(good);
                count++;
            }
        }
    });

    if (count == 0) {
        let empty = document.createElement('p')
        empty.textContent = 'No Result to display!'
        goodView.appendChild(empty);
    }
}

function createGood(json) {
    let name = 'images/' + json['image'];
    let icon = 'icons/' + json['type'] + '.png';
    fetchImg(name, icon)
        .then(values => {

            let section = document.createElement('section');
            goodView.appendChild(section);

            let bar = document.createElement('div');
            section.appendChild(bar);

            let iconUrl = URL.createObjectURL(values[1]);
            let icon = document.createElement('img');
            icon.src = iconUrl;
            bar.appendChild(icon);

            let barp = document.createElement('p');
            barp.textContent = json['name'];
            bar.appendChild(barp);

            let url = URL.createObjectURL(values[0]);
            let img = document.createElement('img');
            img.src = url;
            section.appendChild(img);

            let price = document.createElement('p');
            price.textContent = `$${json['price']}`;
            section.appendChild(price);
        });
}

function fetchImg(name, icon) {
    let nameBlob = fetch(name)
        .then(response => {
            return response.blob();
        });

    let iconBlob = fetch(icon)
        .then(response => {
            return response.blob();
        });

    return Promise.all([nameBlob, iconBlob]);
}