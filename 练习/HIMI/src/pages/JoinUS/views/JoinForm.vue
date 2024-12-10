<template>
    <div class="body-m join-form-body">
        <div class="join-left-body">
            <div>{{ $t('join.join_need') }}</div>
            <h3>{{ $t('join.internship') }}</h3>
            <div>{{ $t('join.internship_content') }}</div>
            <h3>{{ $t('join.parttime') }}</h3>
            <div>{{ $t('join.parttime_content') }}</div>
            <div>{{ $t('join.send_mail') }}
                <Mail class="join-email" :from="himiConfig.email"/>
            </div>
        </div>
        <div class="join-right-body">
            <h3>{{ $t('join.join_today') }}</h3>
            <form :action="url">
                <div>
                    <!-- mailto:sample@fly63.com?subject=test&cc=sample@hotmail.com&subject=主题&body=内容 -->
                    <label for="name">{{ $t('join.name') }}</label>
                    <input type="text" name='name' id="name" maxlength="10" required :value="name">
                </div>
                <div>
                    <label for="phone">{{ $t('join.phone') }}</label>
                    <input type="tel" name='email' id="email" required :value="phone">
                </div>
                <div>
                    <label for="subject">{{ $t('join.subject') }}</label>
                    <input type="text" name='subject' id="subject" required :value="subject">
                </div>
                <div>
                    <label for="message">{{ $t('join.message') }}</label>
                    <textarea name="message" id="message" required :value="message"></textarea>
                </div>
                <input type="submit" class="border-button" :value="$t('join.submit')">
            </form>
        </div>
    </div>
</template>

<script setup lang="ts" name="joinForm">
import Mail from '@/components/Mail.vue';
import { t } from '@/i18n';
import himiConfig from '@/utils/pubConfig';
import { computed, ref } from 'vue';

let name = ref('')
let phone = ref('')
let subject = ref('')
let message = ref('')

let url = computed(()=>{
    let body = t('join.name') + ':' + name + '\n' + t('join.phone') + ':' + phone
    return `mailto:${himiConfig.email}?subject=${subject}&body=${body}`
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
    width: 100%;
    height: 80px;
    border: 1px solid var(--color-border);
    padding: 0.5rem 1rem;
}

.border-button {
    border: 2px solid var(--color-main);
    padding: 1rem 3rem;
    width: auto;
    height: auto;
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