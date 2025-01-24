import { getLocal, removeLocal, setLocal } from "@/common/ts/utils";
import { login, logout } from "@/services/mine";
import type { User } from "@/types/User";
import { defineStore } from "pinia";
import { closeToast, showLoadingToast } from "vant";
import { computed, reactive, ref } from "vue";

export const useUserStore = defineStore('user', () => {
    let user = ref<User | null>()

    let isLogin = computed(() => {
        return user.value != null
    })

    let user_data = computed<User>({
        set(newValue) {
            if (newValue == null) {
                removeLocal('user')
                removeLocal('token')
            } else {
                setLocal('user', JSON.stringify(newValue))
                setLocal('token', newValue?.token || '')
            }
            user.value = newValue
        },
        get() {
            let userJson = getLocal('user') || ''
            let new_user = JSON.parse(userJson) as User
            user.value = new_user
            return new_user
        }
    })

    async function readUser() {
        user_data.value
    }

    async function loginUser(phone: string, code: string) {
        let param = {
            'code': code,
            'phone': phone,
            'deviceInfo': 'iOS'
        }
        showLoadingToast('')
        const { data } = await login(param)
        user_data.value = data
        closeToast()
    }

    async function logoutUser() {
        // await logout()
        user_data.value = null
    }

    return { user, isLogin, readUser, loginUser, logoutUser }
})