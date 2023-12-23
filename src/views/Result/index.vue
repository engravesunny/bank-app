<template>
    <div class="result">
        <img v-if="status === 'success'" src="https://www.kecat.top/other/success.png" alt="">
        <img v-if="status === 'failed'" src="https://www.kecat.top/other/failed.png" alt="">
        <div class="text">{{ text }}</div>
        <van-button round type="primary" @click="handleClick" class="bottom-button">返回</van-button>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { checkOrderStatus } from '@/service/api/transfer';

const route = useRoute()
const text = ref('')
const status = ref('')
const isOrder = ref('')
const handleClick = () => {
    router.back()
}

onMounted(async () => {
    text.value = route.query.result as string || ''
    status.value = route.query.status as string || ''
    isOrder.value = route.query.isOrder as string || ''
    let orderId = route.query.orderId as string || ''
    if (isOrder.value === 'true') {
        const data = await checkOrderStatus({
            orderId: Number(orderId)
        })
        status.value = data === 1 ? 'success' : 'failed'
        text.value = data === 1 ? '转账成功' : '转账失败'
    }
})

</script>

<style lang="less" scoped>
.bottom-button {
    width: 160px;
    height: 40px;
}

.result {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    box-sizing: border-box;
    gap: 100px;
    width: 100vw;
    height: 100vh;
}

.text {
    font-size: 30px;
    font-weight: 600;
}
</style>