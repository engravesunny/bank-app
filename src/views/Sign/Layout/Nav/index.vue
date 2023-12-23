<template>
    <van-nav-bar fixed :title="title">
        <template #left>
            <SvgIcon color="#fff" @click="handleBack" name="set-return" width="35px" height="35px"></SvgIcon>
        </template>
    </van-nav-bar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const title = computed(() => {
    return route.meta.title as string + (route.query.text ? route.query.text : '')
})
const handleBack = () => {
    history.back()
}
</script>

<style lang="less" scoped>
.van-nav-bar {
    background-color: rgba(180, 181, 233, 0);
    color: #fff;
    z-index: 999;
}

:deep(.van-nav-bar__content) {
    height: 75px;
    font-size: 30px;
}

:deep(.van-nav-bar__title) {
    font-size: 30px;
    height: 100%;
    line-height: 75px;
    color: #fff;
}
</style>