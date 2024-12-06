let goodsName = document.querySelector('.enterGoods');
let cartList = document.querySelector('.cartList');
let submit = document.querySelector('.submit');

submit.addEventListener('click', addNewGoods);

function addNewGoods() {
    let goods = goodsName.value;
    if (goods.length === 0) {
        alert('未输入商品名');
        return
    }

    let li = document.createElement('li');

    let goodEle = document.createElement('div');
    li.appendChild(goodEle);

    goodEle.style.display = 'flex';
    goodEle.style.alignItems = 'center';
    let p = document.createElement('p');
    p.textContent = goods;
    goodEle.appendChild(p);

    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'submit';
    deleteBtn.value = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    goodEle.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', function() {
        goodEle.parentElement.removeChild(goodEle);
    });

    cartList.appendChild(li);

    goodsName.value = '';
    goodsName.focus();
}