import type { LoanCache, LoanProduct } from "@/types/LoanProduct";
import APIClient from "@/uils/APIClient";
import { URLEnum } from "@/uils/APIEnum";
import { car_loan_product } from "./home_json";
import type { Response } from "@/uils/Response";

export function carLoanProduct() {
    // return APIClient.post<LoanProduct>(URLEnum.carHomeDetail)
    return new Promise<Response<LoanProduct>>((resolve) => {
        setTimeout(() => {
            resolve(car_loan_product)
        }, 500);
    })
}

export function loanCache() {
    return APIClient.postJson<LoanCache>(URLEnum.lastCarInfo, {"queryType": "2"})
}