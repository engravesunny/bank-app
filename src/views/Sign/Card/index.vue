<template>
    <div class="auth-container">
        <div class="main-form">
            <van-form @submit="onSubmit">
                <van-field v-model="formData.accountPWD" label="请输入账户密码" type="password" name="请输入账户密码"
                    :rules="[{ required: true, message: '请输入账户密码' }]" />
                <van-field v-model="formData.payPWD" label="请输入支付密码" type="password" name="请输入支付密码"
                    :rules="[{ required: true, message: '请输入支付密码' }]" />
                <div style="margin: 16px;position: relative;">
                    <van-button round block native-type="submit">
                        完成
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '@/service/api/mobileBankAccount'
import { showToast } from 'vant';
import { user } from '@/store/user'
import { getICardIdByPhoneNumber } from '@/service/api/bankAccount'
const useStore = user()

const router = useRouter()
const route = useRoute()
const formData = ref({
    username: "",
    documentsNumber: "",
    firstBankcardId: "",
    phoneNumber: '',
    accountPWD: "",
    accountPWDConfirm: "",
    payPWD: ""
})
const onSubmit = async () => {
    try {
        const token = await signup({
            ...formData.value as any
        })
        useStore.setToken(token)
        router.push('/account')
    } catch (error: any) {
        showToast(error.message)
    }
    // router.push('/account')
}

onMounted(async () => {
    formData.value = { ...route.query } as any
    const data = await getICardIdByPhoneNumber({
        phoneNumber: formData.value.phoneNumber
    })
    console.log(data)
})

</script>

<style lang="less" scoped>
.auth-container {
    padding: 20px;
}

:deep(.van-cell) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    width: 100%;
    margin: 50px 0;
    height: 70px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    overflow: unset;
}

:deep(.van-field__label) {
    position: absolute;
    font-size: 18px;
    font-weight: 700;
    top: -30px;
    left: 0;
    color: #fff;
    width: 100%;
    z-index: 999;
}

.van-button {
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    padding: 20px;
}
</style>