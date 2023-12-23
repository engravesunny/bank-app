<template>
    <div class="open-account">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="formData.phoneNumber" name="预留手机号" label="预留手机号" placeholder="预留手机号"
                    :rules="[{ required: true, message: '请填写预留手机号' }]" />
                <van-field v-model="formData.password" type="password" name="支付密码" label="支付密码" placeholder="支付密码"
                    :rules="[{ required: true, message: '请填写支付密码' }]" />
                <van-field v-model="formData.type" is-link readonly name="picker" label="类卡选择" placeholder="点击选择类卡"
                    :rules="[{ required: true, message: '请选择类卡' }]" @click="showTypePicker = true" />
                <van-popup v-model:show="showTypePicker" position="bottom">
                    <van-picker :columns="typeColumns" @confirm="onConfirmType" @cancel="showTypePicker = false" />
                </van-popup>
                <van-field v-model="formData.bankcardId" is-link readonly name="picker" label="开户卡选择" placeholder="点击选择开户卡"
                    :rules="[{ required: true, message: '请选择开户卡' }]" @click="showIdPicker = true" />
                <van-popup v-model:show="showIdPicker" position="bottom">
                    <van-picker :columns="idColums" @confirm="onConfirmId" @cancel="showIdPicker = false" />
                </van-popup>
                <van-field v-model="formData.purpose" name="用途" label="用途" placeholder="用途" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { createBankCardAccount } from '@/service/api/bankAccount';
import { getBankCardAccountId } from '@/service/api/bankMobileRelation';
import { ref } from 'vue';

const type = ref()
const formData = ref({
    "type": "",
    "password": "",
    "phoneNumber": "",
    "purpose": "",
    "bankcardId": ""
})
const typeColumns = [
    { text: 'II类卡', value: 1 },
    { text: 'III类卡', value: 2 },
]
const idColums = ref([{ text: '', value: 0 }])

const showTypePicker = ref(false)
const showIdPicker = ref(false)

const onConfirmType = ({ selectedOptions, selectedValues }: any) => {
    formData.value.type = selectedOptions[0].text;
    type.value = selectedValues[0]
    showTypePicker.value = false
}
const onConfirmId = ({ selectedValues }: any) => {
    formData.value.bankcardId = selectedValues[0]
    showIdPicker.value = false
}
const router = useRouter()
const onSubmit = async () => {
    try {
        await createBankCardAccount({
            ...formData.value as any,
            type: type.value
        })
        router.replace({
            path: '/result',
            query: {
                result: '开户成功',
                status: 'success'
            }
        })
    } catch (error: any) {
        router.replace({
            path: '/result',
            query: {
                result: '开户失败' + error.message,
                status: 'failed'
            }
        })
    }

}

onMounted(async () => {
    const ids = await getBankCardAccountId() as any[]
    const cols = ids.map((id: any) => ({ text: id, value: id }))
    idColums.value = cols
})

</script>

<style lang="less" scoped>
.open-account {
    padding: 20px;
}
</style>