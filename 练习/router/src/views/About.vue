<template>
    <div class="about-body">
        <div class="about-content">
            <div class="about-title">About YOC.TECH</div>
            <div class="about-desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit amet officia corrupti
                aut quo ea distinctio numquam ipsa ex, quaerat velit qui eos expedita, sunt nulla hic, in porro minima.
            </div>
            <div class="about-desc">Quisquam itaque beatae provident dolore similique. Deserunt molestiae ut officia
                tempore libero, illo saepe alias maiores a autem id ullam nostrum error?
            </div>
        </div>
        <el-form :model="form" size="large">
            <el-form-item>
                <el-input placeholder="Name *" v-model="form.name" required />
            </el-form-item>
            <el-form-item>
                <el-input placeholder="Company Name *" v-model="form.companyName" required />
            </el-form-item>
            <el-form-item>
                <el-input placeholder="Company Websites" v-model="form.companyWebsite" required />
            </el-form-item>
            <el-form-item>
                <el-input placeholder="Business Email *" v-model="form.email" required />
            </el-form-item>
            <el-form-item>
                <el-input placeholder="Whats or Telegram" v-model="form.whatsOrTem" />
            </el-form-item>
            <el-form-item>
                <el-input placeholder="Message *" v-model="form.message" required maxlength="1000" type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6 }" class="form-message" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts" name="About">
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    name: '',
    companyName: '',
    companyWebsite: '',
    email: '',
    whatsOrTem: '',
    message: '',
})

const onSubmit = () => {
    console.log('submit!')
}
</script>

<style scoped lang="scss">
.about-body {
    padding: 0 5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .about-content {
        width: 50%;

        .about-title {
            font-weight: bold;
            font-size: 2rem;
            padding-bottom: 2rem;
        }
    }

    .el-form {
        width: 50%;
    }
}
</style>