<template>
    <div class="sign-up-container">
        <div class="main-form">
            <van-form @submit="onSubmit">
                <van-field v-model="formData.phoneNumber" label="请输入手机号" name="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]" />
                <van-field v-model="formData.accountPWD" label="请输入密码" type="password" name="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="formData.accountPWDConfirm" label="请再次输入密码" type="password" name="密码"
                    :rules="[{ required: true, message: '请再次输入密码' }, { validator: () => { return formData.accountPWD === formData.accountPWDConfirm }, message: '两次输入不一致' }]" />
                <div style="margin: 16px;position: relative;">
                    <van-button round block native-type="submit">
                        下一步
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()

const formData = ref({
    phoneNumber: '',
    accountPWD: "",
    accountPWDConfirm: "",
    username: "",
    documentsNumber: "",
    firstBankcardId: ""
})
const onSubmit = () => {
    router.push({
        path: '/auth',
        query: {
            ...formData.value
        }
    })
}


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