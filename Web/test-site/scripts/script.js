const ul = document.querySelector('ul');

if (!ul) {
    ul = document.createElement('ul');
    document.body.appendChild(ul);
}

ul.onclick = function() {
  const listItem = document.createElement('li');
  const listContent = prompt('希望列表中显示什么内容？');
  listItem.textContent = listContent;
  ul.appendChild(listItem);

  listItem.onclick = function(e) {
    e.stopPropagation();
    const listContent = prompt('为列表项输入新的内容');
    this.textContent = listContent;
  };
};