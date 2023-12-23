<template>
    <div class="sign-in-container">
        <div class="top">
            <van-button round @click="handleSinUp">新用户登录</van-button>
        </div>
        <div class="main-form" v-if="!loginByMobile">
            <van-form @submit="onSubmit">
                <van-field v-model="formData.documentsNumber" label="请输入证件号" name="证件号"
                    :rules="[{ required: true, message: '请输入证件号' }]" />
                <van-field v-model="formData.password" label="请输入密码" type="password" name="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <div style="margin: 16px;position: relative;">
                    <van-button round block native-type="submit">
                        登录
                    </van-button>
                    <div class="left" @click="handleChange">手机号码登录</div>
                </div>
            </van-form>
        </div>
        <div class="main-form" v-else>
            <van-form @submit="onSubmit">
                <van-field v-model="formData.phoneNumber" label="请输入手机号" name="手机号"
                    :rules="[{ required: true, message: '请输入手机号' }]" />
                <van-field v-model="formData.password" label="请输入密码" type="password" name="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <div style="margin: 16px;position: relative;">
                    <van-button round block native-type="submit">
                        登录
                    </van-button>
                    <div class="left" @click="handleChange">证件号登陆</div>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script setup lang="ts">
import { loginByAccount } from '@/service/api/mobileBankAccount'
import { user } from '@/store/user';
import { showToast } from 'vant';
const useStore = user()

const router = useRouter();

const formData = ref({
    type: 1,
    documentsNumber: "",
    smsCode: "",
    password: "",
    phoneNumber: ""
})
const loginByMobile = ref(true)

const onSubmit = async () => {
    try {
        const token = await loginByAccount({
            ...formData.value as any
        })
        useStore.setToken(token)
        router.push('/account')
    } catch (error: any) {
        showToast(error.message)
    }
}

const handleChange = () => {
    loginByMobile.value = !loginByMobile.value
    if (loginByMobile) {
        formData.value.type = 1
    } else {
        formData.value.type = 2
    }
}

const handleForget = () => {

}
const handleSinUp = () => {
    router.push('/sign-up')
}

</script>

<style lang="less" scoped>
.sign-in-container {
    padding: 20px;

    .top {
        display: flex;
        justify-content: flex-end;
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
}

.van-button {
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    padding: 20px;
}

.left {
    position: absolute;
    top: -35px;
    left: -15px;
    color: rgba(255, 255, 255, 0.8);
}

.right {
    position: absolute;
    top: -35px;
    right: 0;
    color: rgba(255, 255, 255, 0.8);
}
</style>