<template>
    <div class="introduce">
        <div class="introduce-body">
            <div class="introduce-title">
                <span>{{ title }}</span>
                <div class="introduce-divider"></div>
            </div>
            <div class="introduce-content">{{ content }}</div>
        </div>
        <img :src=image alt="">
    </div>
</template>

<script setup lang="ts" name="introduce">
defineProps<{
    title: string,
    content: string,
    image: string
}>()
</script>

<style scoped>
.introduce {
    padding: 5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background);
}

.introduce-body {
    width: 45%;
    display: flex;
    flex-direction: column;
}

.introduce img {
    width: 45%;
}

.introduce-title {
    font-size: 2.2rem;
    width: fit-content;
}

.introduce-divider {
    margin: 0.5em 0 1em 0;
    height: 5px;
    width: 100%;
    background: linear-gradient(90deg, #2770F5, #62CEFA);
}

.introduce-content {
    font-size: 20px;
    color: var(--vt-c-text-light-2)
}

@media (max-width: 800px) {
    .introduce {
        flex-direction: column;
    }

    .introduce-body {
        width: fit-content;
    }

    .introduce-divider {
        margin: 10px 0 20px 0;
    }

    .introduce img {
        padding-top: 1em;
        width: 100%;
    }
}
</style>