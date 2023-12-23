<template>
    <div class="qrcode-transfer">
        <div class="title"> {{ title }} </div>
        <div class="qr-code-img">
            <img src="../.././../assets/imgs/qrcodeimg.png" alt="二维码">
        </div>
        <div class="options">
            <div class="option">
                <div class="icon" @click="isInput = !isInput">
                    <SvgIcon name="付款" width="40px" height="40px"></SvgIcon>
                </div>
                <div class="text">{{ isInput ? '收款' : '付款' }}</div>
            </div>
            <div class="option">
                <div class="icon">
                    <SvgIcon name="扫一扫" width="40px" height="40px"></SvgIcon>
                </div>
                <div class="text">扫一扫</div>
            </div>
            <div class="option">
                <div class="icon">
                    <SvgIcon name="历史记录" width="60px" height="60px"></SvgIcon>
                </div>
                <div class="text">历史记录</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isInput = ref(false)
const title = computed(() => {
    return isInput.value ? '收款码' : '付款码'
})

</script>

<style lang="less" scoped>
.qrcode-transfer {
    padding: 20px;
}

.title {
    width: 100%;
    padding: 10px 0 0 0;
    text-align: center;
    font-weight: 700;
    font-size: 30px;
}

.qr-code-img {
    aspect-ratio: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 80%;
        height: 80%;
        object-fit: cover;
    }
}

.options {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;

    .option {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        .text {
            font-size: 16px;
            font-weight: 600;
        }

        .icon {
            width: 70px;
            height: 70px;
            background-color: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            &:active {
                background-color: rgba(255, 255, 255, .4);
            }
        }

    }
}
</style>