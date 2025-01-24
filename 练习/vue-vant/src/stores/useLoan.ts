import { getLocal } from "@/common/ts/utils";
import { carLoanProduct, loanCache } from "@/services/home";
import { defaultLoanProduct, type LoanCache, type LoanProduct } from "@/types/LoanProduct";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoanStore = defineStore('loan', ()=> {
    let loanHome = ref<LoanProduct>(defaultLoanProduct)
    let cacheLoan = ref<LoanCache>()

    async function getHomeLoanProduct() {
        let {data: loan} = await carLoanProduct()
        loanHome.value = loan
    }

    async function getLoanCache() {
        let {data: cache} = await loanCache()
        cacheLoan.value = cache
    }

    async function getLoan() {
        await getHomeLoanProduct()
        if (getLocal('token')) {
            await getLoanCache()
        }
    }

    return { loanHome, cacheLoan, getHomeLoanProduct, getLoanCache, getLoan}
})