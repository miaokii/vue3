<template>
    <div class="item">
        <i>
            <!-- 插槽，插入html代码块 -->
            <slot name="icon"></slot>
        </i>
        <div class="details">
            <h3>
                <slot name="heading"></slot>
            </h3>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts" name="welcomeItem">

</script>

<style scoped>
.item {
    margin-top: 2rem;
    display: flex;
    position: relative;
}

.details {
    /* felx单值，是flex-grow、flex-shrink、flex-basis的组合设置，用于弹性项目如何增大或减少以适应容器中剩余的弹性空间 */
    /* 单值设置的是flex-grow的值，表示容器项目填充容器空余弹性空间的比例 */
    flex: 1;
    margin-left: 1rem;
}

i {
    display: flex;
    /* justify-items 和 align-items 的联合属性， 如果值提供一个值，那么这两个默认值都是提供的这个值*/
    place-items: center;
    /* justify-content 和 align-content 的联合属性， 如果值提供一个值，那么这两个默认值都是提供的这个值*/
    place-content: center;
    width: 32px;
    height: 32px;
    color: var(--color-text);
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

@media (min-width: 1024px) {
    .item {
        margin-top: 0;
        padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
    }

    i {
        /* 垂直居中 */
        top: calc(50% - 25px);
        /* 向左边定位 */
        left: -26px;
        position: absolute;
        border: 1px solid var(--color-border);
        background: var(--color-background);
        border-radius: 8px;
        width: 50px;
        height: 50px;
    }

    .item:before {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        bottom: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:after {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        top: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:first-of-type:before {
        display: none;
    }

    .item:last-of-type:after {
        display: none;
    }
}
</style>