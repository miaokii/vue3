<template>
    <div class="nav-body">
        <span class="nav-logo">HIMI CONSULTING</span>

        <div class="nav-list">
            <RouterLink to="/home" active-class="nav-list-active">{{ $t('nav.home') }}</RouterLink>
            <RouterLink to="/services" active-class="nav-list-active">{{ $t('nav.services') }}</RouterLink>
            <RouterLink to="/joinus" active-class="nav-list-active">{{ $t('nav.joinus') }}</RouterLink>
            <RouterLink to="/contactus" active-class="nav-list-active">{{ $t('nav.contactus') }}</RouterLink>
            <RouterLink to="/teamsAndPolicies" active-class="nav-list-active">{{ $t('nav.aboutus') }}</RouterLink>

            <select class="nav-list-langs" v-model="$i18n.locale">
                <option v-for="local in $i18n.availableLocales" :key="'local-${local}'" :value="local">
                    {{ local }}
                </option>
            </select>
        </div>

    </div>
</template>

<script setup lang="ts" name="navigation">


</script>

<style scoped>
.nav-body {
    height: 70px;
    padding: 0 5rem;
    background-color: var(--color-background);
    display: flex;
    align-items: center;
    justify-content: space-between;    
}

.nav-logo {
    font-size: 35px;
    font-weight: 300;
    letter-spacing: 2px;
}

.nav-list a {
    margin-right: 20px;
    font-weight: bold;
}

.nav-list-active {
  color: #998ea8;
}


.nav-list-langs {
    border: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
    font-weight: bold;
}

.nav-list-langs::after {
    content: '';
    background-color: red;
}

.nav-list-langs:hover ,
.nav-list-langs:focus {
    outline: none;
}

</style>