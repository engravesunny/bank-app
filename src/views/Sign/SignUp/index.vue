<template>
    <div class="sign-up-container">
        <div class="main-form">
            <van-form @submit="onSubmit">
                <van-field v-model="formData.phoneNumber" label="请输入手机号" name="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]" />
                <div class="code" style="display: flex;width: 100%;">
                    <van-field style="width: 50%;" v-model="formData.code" label="请输入验证码" name="验证码"
                        :rules="[{ required: true, message: '请填写手机号' }]" />
                    <!-- <img @click="handleGetImgCode" class="code-btn" :src="imgSrc" alt=""> -->
                    <van-button class="code-btn" @click="handleGetCode">{{ time > 0 ? time + '秒后重新获取' : '获取验证码'
                    }}</van-button>
                </div>
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
import { getCode, authCode } from '@/service/api/auth';
import { showToast } from 'vant';
import { getICardIdByPhoneNumber } from '@/service/api/bankAccount';
const router = useRouter()
const route = useRoute()
const time = ref(0)
const formData = ref({
    phoneNumber: '',
    accountPWD: "",
    accountPWDConfirm: "",
    username: "",
    documentsNumber: "",
    firstBankcardId: "",
    code: ""
})
let imgSrc = ref('')
let imgUUid = ref('')
const onSubmit = async () => {
    try {
        await authCode({
            type: imgSrc.value ? 0 : 1,
            phoneNumber: imgSrc.value ? undefined : formData.value.phoneNumber,
            smsCode: imgSrc.value ? undefined : formData.value.code,
            // uuid: imgUUid.value,
            // imgCode: formData.value.code,
        })
        const data = await getICardIdByPhoneNumber({
            phoneNumber: formData.value.phoneNumber
        })
        if (data) {
            formData.value.firstBankcardId = data
            router.push({
                path: '/auth',
                query: {
                    ...formData.value,
                    ...route.query
                }
            })
        } else {
            showToast("该号码无I类卡")
        }
    } catch (error: any) {
        showToast(error.message)
    }
}
const timer = ref()
const handleGetCode = async () => {
    if (formData.value.phoneNumber === '') {
        showToast('请输入手机号')
        return
    }
    if (timer.value) {
        return
    }
    time.value = 60
    timer.value = setInterval(() => {
        time.value = time.value - 1
        if (time.value === 0) {
            clearInterval(timer.value)
            timer.value = null
        }
    }, 1000) as any;

    const data = await getCode({
        type: 1,
        phoneNumber: formData.value.phoneNumber
    })
    console.log(data)

}

const handleGetImgCode = async () => {
    const data = await getCode({
        type: 0,
        phoneNumber: formData.value.phoneNumber
    })
    imgSrc.value = data.imageBase64Data
    imgUUid.value = data.uuid
}

onMounted(() => {
    // handleGetImgCode()
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