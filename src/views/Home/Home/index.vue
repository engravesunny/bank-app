<template>
    <div class="home-container">
        <van-grid class="grid" :column-num="2" :gutter="10">
            <van-grid-item @click="router.push('/transaction-detail')">
                <div class="item">
                    <van-icon name="balance-list-o" />
                    <span style="font-size: 16px;">收支明细</span>
                </div>
            </van-grid-item>
            <van-grid-item @click="router.push('/tranfer-money')">
                <div class="item">
                    <van-icon name="exchange" />
                    <span style="font-size: 16px;">转账汇款</span>
                </div>
            </van-grid-item>
            <van-grid-item @click="router.push('/qrcode-transfer')">
                <div class="item">
                    <van-icon name="qr" />
                    <span style="font-size: 16px;">二维码收付款</span>
                </div>
            </van-grid-item>
            <van-grid-item @click="router.push('/my-account-info')">
                <div class="item">
                    <van-icon name="manager-o" />
                    <span style="font-size: 16px;">账户总览</span>
                </div>
            </van-grid-item>

        </van-grid>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style lang="less" scoped>
:deep(.van-grid-item__content) {
    border-radius: 10px;
    background-color: #fff !important;
    border: none;

    &:active {
        background-color: rgba(255, 255, 255, .4) !important;
    }

    &::after {
        content: "";
        border: none;
    }
}

.home-container {
    width: 100%;
    height: 100%;
    position: relative;

    .grid {
        position: absolute;
        top: 50%;
        transform: translate(0, -70%);
    }
}

.item {
    font-size: 70px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
}
</style>@/service/api/userInfo