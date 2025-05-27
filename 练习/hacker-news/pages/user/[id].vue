<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id as string)

const result = await fetchUser(id.value)
const { data: user, loading } = toRefs(result)

useHead({
    title: () => loading.value ? 'Loading' : user.value ? user.value.id : 'User not found'
})

</script>

<template>
    <div class="center-body user-view">
        <load-spinner v-if="loading" />
        <template v-else-if="user">
            <h1>User: {{ user.id }}</h1>
            <ul class="meta">
                <li>
                    <span class="label">Created:</span>{{ timeAgo(new Date(user.created)) }} ago
                </li>
                <li>
                    <span class="label">Karma:</span> {{ user.karma || '-' }}
                </li>
                <li v-if="user.about" class="about" v-html="user.about" />
            </ul>
            <p class="link">
                <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submission</a> |
                <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
            </p>
        </template>
        <template v-else>
            <h1>User not found.</h1>
        </template>
    </div>
</template>

<style scoped lang="scss">
.user-view {
    background-color: white;
    padding: 2em 3em;
    display: flex;
    flex-direction: column;
    gap: 1em;

    li {
        padding-top: 1em;
        .label {
            display: inline-block;
            min-width: 4em;
        }
    }

    .about {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .link a {
        text-decoration: underline;
    }
}
</style>