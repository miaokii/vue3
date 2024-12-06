/// 类型选择
let selectEle = document.querySelector('select');
/// 产品网格
let goodsGrid = document.querySelector('.goodsPage')
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

    goodsGrid.innerHTML = '';

    goods.forEach(good => {
        if (type === 'All') {
            if (key === '' || good['name'].indexOf(key) > -1)
                createGood(good);
        } else {
            if (good['type'] === type && (good['name'].indexOf(key) > -1 || key === "")) {
                createGood(good);
            }
        }
    });
}

function createGood(json) {
    let name = 'images/' + json['image'];
    let icon = 'icons/' + json['type'] + '.png';
    fetchImg(name, icon)
        .then(values => {

            let goodEle = document.createElement('div');
            goodEle.className = 'gridEle';
            goodsGrid.appendChild(goodEle);

            let url = URL.createObjectURL(values[0]);
            let img = document.createElement('img');
            img.className = 'goodImage';
            img.src = url;
            goodEle.appendChild(img);

            let div = document.createElement('div');
            div.className = 'goodNameBar';
            goodEle.appendChild(div);

            let iconUrl = URL.createObjectURL(values[1]);
            let icon = document.createElement('img');
            icon.src = iconUrl;
            div.appendChild(icon);

            let p = document.createElement('p');
            p.textContent = json['name'];
            div.appendChild(p);

            let shadowDiv = document.createElement('div');
            shadowDiv.className = 'goodPriceShadow';
            goodEle.appendChild(shadowDiv);

            let floatDiv = document.createElement('div');
            floatDiv.className = 'goodPriceView';
            goodEle.appendChild(floatDiv);

            let price = document.createElement('p');
            price.textContent = `$${json['price']}`;
            floatDiv.appendChild(price);
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