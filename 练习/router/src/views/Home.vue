<template>
    <div class="home-body">
        <div class="home-title">Lorem ipsum dolor sit amet.</div>
        <div class="home-list">
            <div data-aos="fade-up" class="home-body-item" v-for="(item, idx) in workConfig.contentList" :key="idx">
                <img v-if="idx % 2 == 1" :src="utils.getImage(`${item.image}`)" alt="">
                <div class="home-item-desc">
                    <div class="home-item-title">{{ item.title }}</div>
                    <div class="home-item-content">{{ item.content }}</div>
                </div>
                <img v-if="idx % 2 == 0" :src="utils.getImage(`${item.image}`)" alt="">
            </div>
        </div>
    </div>

    <el-backtop :bottom="100">
        <div style="display: flex; align-items: center; ">
            <div>ScrollToTop</div>
            <el-icon>
                <Top />
            </el-icon>
        </div>
    </el-backtop>

</template>

<script setup lang="ts" name="name">
import workConfig from '@/common/ts/workConfig';
import { getCurrentInstance, onMounted } from 'vue';
import { Top } from '@element-plus/icons-vue';

const { proxy } = getCurrentInstance() as any;

console.log(proxy.utils.appConfig);

onMounted(() => {
    console.log(proxy.utils.getImage('image.png'));
})

</script>

<style scoped lang="scss">
.home-body {
    .home-title {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        padding-bottom: 4rem;
    }

    .home-list {
        display: flex;
        flex-direction: column;
        gap: 4rem;

        .home-body-item {
            display: flex;
            gap: 4rem;
            align-items: center;

            .home-item-desc {
                .home-item-title {
                    font-weight: bold;
                    font-size: 1.5rem;
                    padding-bottom: 1rem;
                }

                .home-item-content {
                    font-size: 1.1rem;
                }
            }

            img {
                object-fit: cover;
                width: 45%;
                border-radius: 10px;
                box-shadow: 5px 5px 10px gray;
            }

        }
    }
}

.el-backtop {
    width: fit-content;
    padding: 0 10px;
    border-radius: 20px;
}
</style>