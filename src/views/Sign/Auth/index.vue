<template>
    <div class="auth-container">
        <div class="main-form">
            <van-form @submit="onSubmit">
                <van-field v-model="formData.username" label="真实姓名" name="用户名"
                    :rules="[{ required: true, message: '请填写真实姓名' }]" />
                <van-field v-model="formData.documentsNumber" label="身份证号" name="身份证号"
                    :rules="[{ required: true, message: '请填写身份证号' }]" />
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
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
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
        path: '/card',
        query: {
            ...formData.value as any
        }
    })
}

onMounted(() => {
    formData.value = { ...route.query } as any
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
    z-index: 999;
}

.van-button {
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    padding: 20px;
}
</style>