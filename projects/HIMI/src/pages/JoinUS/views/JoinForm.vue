<template>
    <div class="body-m join-form-body">
        <div class="join-left-body">
            <div>{{ $t('join.join_need') }}</div>
            <h3>{{ $t('join.internship') }}</h3>
            <div>{{ $t('join.internship_content') }}</div>
            <h3>{{ $t('join.parttime') }}</h3>
            <div>{{ $t('join.parttime_content') }}</div>
            <div>{{ $t('join.send_mail') }}
                <Mail class="join-email" :to="himiConfig.email" />
            </div>
        </div>
        <div class="join-right-body">
            <h3>{{ $t('join.join_today') }}</h3>
            <form :action="`mailto:${himiConfig.email}`">
                <div>
                    <label for="name">{{ $t('join.name') }}</label>
                    <input type="text" maxlength="10" required v-model="name">
                </div>
                <div>
                    <label for="phone">{{ $t('join.phone') }}</label>
                    <input type="tel" required v-model="phone">
                </div>
                <div>
                    <label for="subject">{{ $t('join.subject') }}</label>
                    <input type="text" name='subject' required>
                </div>
                <div>
                    <label for="message">{{ $t('join.message') }}</label>
                    <textarea required v-model="message"></textarea>
                    <textarea required v-model="mailBody" v-show="false" name="body"></textarea>
                </div>
                <button type="submit" class="border-button">{{ $t('join.submit') }}</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts" name="joinForm">
import Mail from '@/components/Mail.vue';
import { t } from '@/i18n';
import himiConfig from '@/utils/pubConfig';
import { computed, onMounted, onUnmounted, ref } from 'vue';

let name = ref('')
let phone = ref('')
let message = ref('')

let mailBody = computed(() => {
    return `${t('join.name')}:${name.value}\n${t('join.phone')}:${phone.value}\n${message.value}`
})

</script>

<style scoped>
.join-form-body {
    display: flex;
    text-align: start;
    margin-top: 0;

    margin-bottom: 4rem;
}

.join-left-body {
    width: 70%;
}

h3 {
    font-weight: bold;
    letter-spacing: 0;
    margin: 1rem 0;
}

.join-left-body div {
    margin: 1rem 0;
}

.join-left-body div:first-child {
    margin-top: 0;
}

.join-email {
    font-weight: bold;
    cursor: pointer;
}

.join-email:hover {
    color: var(--color-main-hover);
}

.join-right-body {
    width: 50%;
    margin-left: 2rem;
}

.join-right-body h3 {
    margin: 0;
}

form label {
    display: block;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0;
}

form div {
    margin-top: 1rem;
}

form input {
    border: 1px solid var(--color-border);
    height: 2.6rem;
    width: 100%;
    padding: 0 1rem;
    font-size: 1.2rem;
    color: inherit;
}

form input:focus {
    border: 1px solid var(--color-border);
}

form textarea {
    font-size: 1.2rem;
    resize: vertical;
    color: inherit;
    width: 100%;
    height: 80px;
    border: 1px solid var(--color-border);
    padding: 0.5rem 1rem;
}

@media (max-width: 650px) {
    .join-form-body {
        flex-direction: column;
        text-align: center;
    }

    .join-left-body,
    .join-right-body {
        width: 100%;
        margin: 0;
    }

    h3 {
        text-align: center;
    }

    form label {
        text-align: start;
    }
}
</style>