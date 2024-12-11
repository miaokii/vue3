<template>
    <div class="body-m disclaimer-body">
        <h1>{{ $t('disclaimer.title') }}</h1>
        <article>
            <section>
                <p> {{ $t('disclaimer.page1') }}</p>
            </section>
            <section>
                <p> {{ $t('disclaimer.page2') }}</p>
            </section>
        </article>
    </div>
</template>

<script setup lang="ts" name="disclaimer">

</script>

<style scoped>
.disclaimer-body {
    padding: 0 3rem;
    margin-bottom: 3rem
}

h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    margin: 3rem;
}

article {
    margin-bottom: 3rem;
}

section {
    margin: 2rem 0;
}

p {
    font-size: 1.2rem;
    line-height: 2;
    text-indent: 2em;
}

@media (max-width:650px) {

    .disclaimer-body {
        padding: 0 ;
        margin-bottom: 2rem
    }

    p {
        font-size: 1rem
    }

    h1 {
        font-size: 2rem;
        margin: 2rem;
    }

}
</style>