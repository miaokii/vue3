<template>
    <div class="image_verfiy">
        <!-- 使用ref获取DOM节点 -->
        <!-- ref用在DOM节点上，获取DOM节点 -->
        <!-- ref用在DOM组件上，获取到的是组件的实例对象 -->
        <canvas ref="verify" :width="state.width" :height="state.height" @click="handleDraw"></canvas>
    </div>
</template>

<script setup lang="ts" name="image_Verfiy">
import { onMounted, reactive, ref } from 'vue';

const verify = ref()
const state = reactive({
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    width: 120,
    height: 40,
    imgCode: ''
})

// 暴露组件属性
defineExpose( {state} )
// 初始化时绘制
onMounted(()=> {
    state.imgCode = draw()
})

// 点击图片重新绘制
const handleDraw = ()=> {
    state.imgCode = draw()
}

// 随机数
const randomNum  = (min: number,max: number) => {
    return parseInt(`${Math.random() * (max - min) + min}`)
}

// 随机颜色
const randomColor = (min: number, max: number) => {
    const r = randomNum(min, max)
    const g = randomNum(min, max)
    const b = randomNum(min, max)
    return `rgb(${r},${g},${b})`
}

// 绘制图片
const draw = () => {
    // 填充背景颜色，浅色
    const ctx = verify.value.getContext('2d')
    // 填充颜色
    ctx.fillStyle = randomColor(180, 230)
    // 填充位置
    ctx.fillRect(0, 0, state.width, state.height)

    // 定义paramText
    let imgCode = ''
    // 随机产生4个字符，随机旋转
    for (let i = 0; i < 4; i++) {
        // 随机字符
        const text = state.pool[randomNum(0, state.pool.length)]
        // 字符拼接到一起
        imgCode += text
        const fontSize = randomNum(18, 40)
        const deg = randomNum(-30, 30)

        /**
         * 绘制文字并让四个文字在不同位置
         * 
         * 1. 定义字体
         * 2. 定义对齐方式
         * 3. 填充不同颜色
         * 4. 保存当前状态
         * 5. 平移
         * 6. 旋转
         * 7. 填充文字
         * 8. restore出栈
         *  
         */
        // 字体字号
        ctx.font = fontSize + 'px Simhei'
        // 对齐
        ctx.textBaseline = 'top'
        // 文字颜色
        ctx.fillStyle = randomColor(80, 150)

        /**
         * save() 方法把当前的状态拷贝一份压入到一个保存图像状态的栈中
         * 这允许临时改变图片的状态
         * 然后，通过调用restore()来恢复以前的值
         * save是入栈，restore是出栈
         * 用来保存Canvas的状态，save之后，可以调用canvas的平移、缩放、旋转、裁剪等操作
         * restore用来恢复canvas之前保存的状态，防止save后对canvas执行的操作对后续绘制有影响
         */
        ctx.save()
        // 平移
        ctx.translate(30 * i + 15, 15)
        // 旋转弧度
        ctx.rotate((deg * Math.PI) / 180)
        // fillText方法在画布绘制填色的文本，默认颜色是黑色
        // 使用font定义字体和字号，使用fillStyle以另一种颜色/渐变渲染文本
        ctx.fillText(text, -15 + 5, -15)
        ctx.restore()
    }

    // 随机产生5题哦干扰线，浅色
    for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        // 起点
        ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height))
        // 终点
        ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height))
        // 颜色
        ctx.strokeStyle = randomColor(180, 230)
        // 闭合
        ctx.closePath()
        // 绘制
        ctx.stroke()
    }

    // 随机产生40个扰动点
    for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(randomNum(0, state.width), randomNum(0, state.height), 1, 0, 2 * Math.PI)
        ctx.closePath
        ctx.fillStyle = randomColor(150, 200)
        ctx.fill()
    }
    return imgCode
}

</script>

<style scoped>

.image_verfiy canvas {
    cursor: pointer;
}

</style>