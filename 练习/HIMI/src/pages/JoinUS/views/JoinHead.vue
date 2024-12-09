<template>
    <div class="join-head-body">
        <div class="join-head"></div>
        <h2>{{ $t('join.join_us') }}</h2>
        <div class="body-m join-body">
            <div>{{ $t('join.join_content') }}</div>
            <hr>
        </div>
    </div>
</template>

<script setup lang="ts" name="joinHead">

</script>

<style scoped>
.join-head {
    height: 26vw;
    background-image: url('@/assets/images/joinus/back.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.join-head-body {
    text-align: center;
}

.join-body div {
    margin-bottom: 2em;
}

hr {
    color: var(--color-background-soft);
    color: var(--color-background);

}
</style>