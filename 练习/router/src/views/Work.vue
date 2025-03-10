<template>
    <div class="work-body">
        <div class="work-title">Lorem ipsum dolor sit amet.</div>
        <div class="work-list">
            <div class="work-body-item" v-for="(item, idx) in workConfig.contentList" :key="idx">
                <img v-if="idx % 2 == 1" :src="utils.getImage(`${item.image}`)" alt="">
                <div>
                    <div class="work-item-title">{{ item.title }}</div>
                    <div class="work-item-content">{{ item.content }}</div>
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
.work-body {
    width: calc(100vw - var(--nav-width));
    height: calc(100vh - var(--header-height));
    overflow-y: scroll;
    padding: 2rem 10rem;
    padding-bottom: 10rem;

    .work-title {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        padding-bottom: 4rem;
    }

    .work-list {
        display: flex;
        flex-direction: column;
        gap: 4rem;

        .work-body-item {
            display: flex;
            gap: 4rem;
            align-items: center;

            .work-item-title {
                font-weight: bold;
                font-size: 1.5rem;
                padding-bottom: 1rem;
            }

            .work-item-content {
                font-size: 1.1rem;
            }

            img {
                object-fit: cover;
                width: 45%;
                border-radius: 10px;
                box-shadow: 5px 5px 10px gray;
                ;
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