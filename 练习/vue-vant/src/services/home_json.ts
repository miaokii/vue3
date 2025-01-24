import type { LoanProduct } from "@/types/LoanProduct";
import type { Response } from "@/uils/Response";

export const car_loan_product: Response<LoanProduct> = {
    "code": 200,
    "subCode": 0,
    "msg": "success",
    "timestamp": 1737517035067,
    "logMessageId": "381997f6a582493d853d635b210b984e",
    "data": {
        "id": "1",
        "productName": "好信车贷",
        "productProvider": "1",
        "maxLoanMoney": 1000000.0000,
        "minLoanMoney": 0.0000,
        "minYearRate": 6.00,
        "maxYearRate": 24.00,
        "minLoanTerm": 0.00,
        "maxLoanTerm": 5.00,
        "status": 0,
        "productLogUrl": "https://img12.iqilu.com/10339/clue/202405/29/68ec17f5-9621-461f-ad22-a6820a3f9cf5.jpg",
        "productProviderName": "",
        "productLocation": 1,
        "createTime": "2025-01-08 17:00:28",
        "updateTime": "2025-01-21 19:25:23",
        "delFlag": false
    }
} 