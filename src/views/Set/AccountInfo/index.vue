<template>
    <div class="account-info">
        <change-info v-if="isChanging" :info="useStore.info.value" />
        <div v-else style="margin: 10px 0;" v-for="info in account_infos">
            <van-cell-group :border="false" :title="info.title">
                <van-cell v-for="item in info.list" :title="item.title"
                    :value="familyStatus[useStore.info.value[item.index]] || useStore.info.value[item.index] || item.defaultValue" />
            </van-cell-group>
        </div>
        <div v-if="!isChanging" style="width: 100%;text-align: center;padding: 20px 0;">
            <van-button style="width: 80%;" round @click="handleClick">修改个人信息</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import changeInfo from './changeInfo.vue';
import { user } from '@/store/user'
const isChanging = ref(false)
const familyStatus = ['未婚', '已婚']

const useStore = storeToRefs(user())
const account_infos = [
    {
        title: '基本信息',
        list: [
            {
                title: '姓名',
                index: 'name',
                defaultValue: ''
            },
            {
                title: '英文/拼音',
                index: 'pinYin',
                defaultValue: ''
            },
            {
                title: '证件类型',
                index: 'documentsType',
                defaultValue: ''
            },
            {
                title: '证件号码',
                index: 'documentsNum',
                defaultValue: ''
            },
            {
                title: '证件起始日期',
                index: 'documentsStartDate',
                defaultValue: ''
            },
            {
                title: '证件失效日期',
                index: 'documentsExpDate',
                defaultValue: ''
            },
            {
                title: '性别',
                index: 'gender',
                defaultValue: ''
            },
            {
                title: '民族',
                index: 'ethnicity',
                defaultValue: ''
            },
            {
                title: '婚姻状况',
                index: 'maritalStatus',
                defaultValue: ''
            },
            {
                title: '家庭状况',
                index: 'familyStatus',
                defaultValue: ''
            }

        ]
    },
    {
        title: '个人常住地址信息',
        list: [
            {
                title: '国家/地区',
                index: 'country',
                defaultValue: ''
            },
            {
                title: '省/市区',
                index: 'region',
                defaultValue: ''
            },
            {
                title: '详细地址',
                index: 'address',
                defaultValue: ''
            }
        ]
    },
    {
        title: '工作信息',
        list: [
            {
                title: '职业',
                index: 'profession',
                defaultValue: ''
            },
            {
                title: '工作单位/学校',
                index: 'organization',
                defaultValue: ''
            },
        ]
    },
    {
        title: '基本信息',
        list: [
            {
                title: '手机号码',
                index: 'phoneNumber',
                defaultValue: ''
            },
        ]
    }
]
const handleClick = () => {
    isChanging.value = !isChanging.value
}
</script>

<style lang="less" scoped>
.account-info {
    padding: 20px;
}

:deep(.van-cell) {
    border-radius: 10px;
}

:deep(.van-cell-group) {
    border-radius: 10px;
}
</style>