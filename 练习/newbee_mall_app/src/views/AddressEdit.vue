<template>
    <div class="address-edit-box">
        <simple-header :name="state.type == 'add' ? '新增地址' : '编辑地址'" />
        <van-address-edit class="edit" :address-info="state.addressInfo" :area-list="areaList"
            :show-delete="state.type == 'edit'" show-set-default show-search-result :search-result="state.searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
            @change="onChangeDetail"></van-address-edit>
    </div>
</template>

<script setup lang="ts" name="addressEdit">
import SimpleHeader from '@/components/NavBar.vue';
import { address, addressDelete, addressDetail, addressEdit, addressNew } from '@/service/user';
import { areaList } from '@vant/area-data';
import { showToast, type AddressEditInfo } from 'vant';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const state = reactive({
    type: route.query.type,
    searchResult: [],
    addressId: route.query.addressId as string,
    addressInfo: {} as AddressEditInfo,
    from: route.query.from || ''
})

onMounted(async () => {
    if (state.type == 'add') return

    const { data } = await addressDetail(state.addressId)
    state.addressInfo = {
        tel: data.userPhone,
        name: data.userName,
        city: data.cityName,
        county: data.regionName,
        country: '',
        province: data.provinceName,
        areaCode: '',
        isDefault: data.defaultFlag,
        addressDetail: data.detailAddress
    }
})

async function onSave(content: AddressEditInfo) {
    const param = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
        addressId: ''
    }

    if (state.type == 'edit') {
        param.addressId = state.addressId
    }

    await state.type == 'add' ? addressNew(param) : addressEdit(param)
    showToast('保存成功')
    setTimeout(() => {
        router.back()
    }, 1000);
}

async function onDelete() {
    await addressDelete(state.addressId)
    showToast('删除成功')
    setTimeout(() => {
        router.back()
    }, 1000);
}

function onChangeDetail() {

}

</script>

<style scoped lang="less">
@import '../common/style/mixin.less';

.edit {
    .van-field__body {
        textarea {
            height: 40px !important;
        }
    }
}

.address-edit-box {
    .van-address-edit {
        .van-button--danger {
            background: @primary;
            border-color: @primary;
        }
        .van-switch-on {
            background: @primary;
        }
    }
}

</style>