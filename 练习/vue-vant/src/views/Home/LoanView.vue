<template>
    <div class="loan-product-box">
        <van-divider class="loan-max-title" dashed>最高可借额度</van-divider>
        <span class="loan-max-value">{{ formatMoney(loanProduct.maxLoanMoney) }}</span>
        <div class="loan-rate">
            <span>综合年化利率</span>
            <span class="loan-rate-value">{{ loanProduct.minYearRate }}%-{{ loanProduct.maxYearRate }}%</span>
            <span>，期限最长</span>
            <span class="loan-rate-value">{{ loanProduct.maxLoanTerm }}</span>
            <span>年</span>
        </div>

        <div class="loan-feature">
            <div class="feature-item">
                <van-icon name="checked" />
                <span>不押车</span>
            </div>
            <div class="feature-item">
                <van-icon name="checked" />
                <span>易申请</span>
            </div>
            <div class="feature-item">
                <van-icon name="checked" />
                <span>持牌机构</span>
            </div>
        </div>

        <van-button type="success" block round text="立即申请提现" color="primary" @click="apply"></van-button>
        <span class="loan-hint">*最终已实际审批利率为准</span>
        <img class="loan-step" :src="getAssetsImages('home/home_step.png')" alt="">

    </div>
</template>

<script setup lang="ts" name="loanProduct">
import type { LoanProduct } from '@/types/LoanProduct';
import { formatMoney, getAssetsImages } from '@/common/ts/utils';

defineProps<{
    waitApply: boolean,
    loanProduct: LoanProduct,
    apply: ()=>void,
}>()

</script>

<style scoped lang="less">
@import '/src/Common/style/mixin.less';

.loan-product-box {
    background: white;
    border-radius: 10px;
    padding: 20px 0 20px 0;
    margin-top: 20px;

    .flex();
    flex-direction: column;
    align-items: center;

    .loan-max-title {
        color: @msg;
        font-size: 12px;
        width: 100%;
        margin: 0;
        border-color: @divider;
    }

    .loan-max-value {
        font-size: 35px;
        font-weight: 500;
    }

    .loan-rate {
        font-size: 12px;
        color: #666666;
        padding-top: 5px;

        .loan-rate-value {
            color: @primary;
        }
    }

    .loan-feature {
        display: flex;
        font-size: 13px;
        font-weight: 300;
        padding-top: 10px;

        .van-icon {
            color: @primary;
        }

        .feature-item {
            padding: 0 7px;
            span {
                padding-left: 2px;
            }
        }
    }

    .van-button {
        width: 80%;
        margin-top: 20px;
        background: linear-gradient(90deg, @primary, #4e7df3, @primary);
    }

    .loan-hint {
        font-size: 11px;
        color: #999999;
        padding: 10px 0;
    }

    .loan-step {
        width: 90%;
    }
}
</style>