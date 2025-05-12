<template>
  <div class="product-body">
    <div v-for="(product, index) in products" :key="index" class='product-item'>
      <div class="full-bg" v-if="index % 2 === 0" :style="{ background: `url(${product.image})` }"></div>
      <div class="color-bg" v-else></div>
      <div class="content-wrapper">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup name="App">
import product1 from '@/assets/images/product1.jpg'
import product2 from '@/assets/images/product2.jpg'
import product3 from '@/assets/images/product3.jpg'
import product4 from '@/assets/images/product4.jpg'
import product5 from '@/assets/images/product5.jpg'

const products = [
  {
    title: "Product 1",
    description: "Description 1",
    price: 100,
    image: product1
  },
  {
    title: "Product 2",
    description: '',
    price: 100,
    image: product2
  },
  {
    title: "Product 3",
    description: "Description 3",
    price: 100,
    image: product3
  },
  {
    title: "Product 4",
    description: "Description 4",
    price: 100,
    image: product4
  },
  {
    title: "Product 5",
    description: "Description 5",
    price: 100,
    image: product5
  },
]
</script>

<style scoped>

.product-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.product-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 80vh;
  position: relative;
  /* 允许背景超出部分显示 */
  /* overflow: visible; */
}

.full-bg {
  position: absolute;
  top: 0;
  left: calc(-50vw + 50%);
  width: 100vw;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.color-bg {
  position: absolute;
  top: 0;
  left: calc(-50vw + 50%);
  /* width: 100vw; */
  height: 100%;
  background-color: lightcyan;
  z-index: -1;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>