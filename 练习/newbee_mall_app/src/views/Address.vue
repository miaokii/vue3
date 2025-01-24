<template>
    <div class="address-box">
        <simple-header name="地址管理" :back="state.from == 'crate-order' ? '' : '/user'" />
        <div class="address-item">
            <van-address-list v-if="state.from != 'mine'" v-model="state.choosedAddressID" :list="state.list"
                default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="onSelect" right-icon="edit"/>
            <van-address-list v-else v-model="state.choosedAddressID" :list="state.list" default-tag-text="默认"
                @add="onAdd" @edit="onEdit" right-icon="edit"/>
        </div>

    </div>
</template>

<script setup lang="ts" name="address">
import SimpleHeader from '@/components/NavBar.vue';
import type { UserAddress } from '@/interfaces/User';
import { address } from '@/service/user';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { type AddressListAddress } from 'vant';
import router from '@/router';

const route = useRoute()
const state = reactive({
    list: [] as AddressListAddress[],
    address: [] as UserAddress[],
    choosedAddressID: '',
    from: route.query.from ?? ''
})

onMounted(()=>{
    requestAddress()
})

async function requestAddress() {
    const { data } = await address()
    state.address = data
    state.list = data.map(item => {
        return {
            id: item.addressId,
            name: item.userName,
            tel: item.userPhone,
            address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
            isDefault: !!item.defaultFlag
        }
    })
    if (data.length) {
        state.choosedAddressID = data[0].addressId
    }
}

function onAdd() {
    router.push({path: '/address-edit', query:{type:'add', from: state.from}})
}

function onEdit(item: AddressListAddress) {
    router.push({path: '/address-edit', query:{type:'edit', from: state.from, addressId: item.id}})
}

function onSelect(item: AddressListAddress) {
    const {cartItemIds} = route.query
    router.push({path: '/create-order', query: { addressId:  item.id, from: state.from, cartItemIds}})
}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.address-box {
    /deep/ .van-radio__icon {
        display: none;
    }
    .address-item {
        .van-button {
            background: @primary;
            border-color: @primary;
        }
    }
}

</style>