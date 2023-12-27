<template>
    <div class="sign-up-container">
        <div class="main-form">
            <van-form @submit="onSubmit">
                <van-field v-if="phoneNumber" v-model="formData.phoneNumber" label="请输入新的手机号" name="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]" />
                <van-field v-if="accountPwdChange || payPwdChange" v-model="formData.oldPassword" type="password"
                    label="请输入旧密码" name="手机号" :rules="[{ required: true, message: '请输入旧密码' }]" />
                <van-field v-if="accountPwdChange || payPwdChange || payPwdReset || accountPwdReset"
                    v-model="formData.password" label="请输入新密码" name="手机号" type="password"
                    :rules="[{ required: true, message: '请输入新密码' }]" />
                <div style="margin: 16px;position: relative;">
                    <van-button round block native-type="submit">
                        确认
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { changePassword, changePhoneNumber, resetPassword } from '@/service/api/mobileBankAccount'
const router = useRouter()
const route = useRoute()
const phoneNumber = ref(false)
const payPwdChange = ref(false)
const payPwdReset = ref(false)
const accountPwdReset = ref(false)
const accountPwdChange = ref(false)
const ssl = ref(false)

const formData = ref({
    type: 1,
    phoneNumber: '',
    password: "",
    oldPassword: "",
})
const onSubmit = () => {
    try {
        if (phoneNumber.value) {
            // 手机号
            changePhoneNumber({
                phoneNumber: Number(formData.value.phoneNumber)
            })
        }
        if (payPwdChange.value || accountPwdChange.value) {
            // 修改
            changePassword({
                ...formData.value
            })
        }
        if (accountPwdReset.value || payPwdReset.value) {
            // 重置
            resetPassword({
                ...formData.value
            })
        }
        router.replace({
            path: '/result',
            query: {
                status: 'success',
                result: route.query.text + '成功',
                changeInfo: 'true'
            }
        })
    } catch (error: any) {
        router.replace({
            path: '/result',
            query: {
                status: 'failed',
                result: route.query.text + '失败',
                reason: error.message
            }
        })
    }
}
onBeforeMount(() => {
    const text = route.query.text
    if (text === '证书更新') {
        ssl.value = true
    } else if (text === '修改账户密码') {
        formData.value.type = 0
        accountPwdChange.value = true
    } else if (text === '账户密码重置') {
        formData.value.type = 0
        accountPwdReset.value = true
    } else if (text === '支付密码重置') {
        formData.value.type = 1
        payPwdReset.value = true
    } else if (text === '支付密码修改') {
        formData.value.type = 1
        payPwdChange.value = true
    } else {
        // 更改手机号吗
        phoneNumber.value = true
    }
})



</script>

<style lang="less" scoped>
.sign-up-container {
    padding: 20px;
}

.code {
    width: 100%;
    display: flex;

    .code-btn {
        flex: 1;
        background-color: rgba(255, 255, 255, 0.7);
        height: 70px;
        border-radius: 10px;
        margin-top: 50px;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:active {
            background-color: rgba(255, 255, 255, 0.4);
        }
    }
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
    font-size: 14px;
    top: -30px;
    left: 0;
    color: #fff;
    z-index: 999;
    width: 100%;
}

.van-button {
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    padding: 20px;
}
</style>