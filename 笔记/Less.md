# Less

Less是css预处理器

## 变量

```css
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

## 混合（Mixins）

混合是将一组属性从一个规则集包含到另一个规则集的方法

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

## 嵌套

```css
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}

/* 等价于css */
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

使用伪选择器和混合一同使用，如clearfix功能，其中&表示当前选择器的父级

```css
.clearfix {
    display: block;
    zoom:1;
    /* &表示当前选择器的父级 */
    &:after {
        content: '';
        display: block;
        font-size: 0;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
```

