<template>
    <van-tabbar v-model="active" route>
        <van-tabbar-item replace to="/home" :icon="active === 0 ? 'wap-home' : 'wap-home-o'">首页</van-tabbar-item>
        <van-tabbar-item replace to="/services" :icon="active === 1 ? 'point-gift' : 'apps-o'">服务</van-tabbar-item>
        <van-tabbar-item replace to="/account" :icon="active === 2 ? 'user' : 'user-circle-o'">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
const active = ref(0)
</script>

<style lang="less" scoped>
.van-tabbar {
    background-color: rgb(234, 137, 149);
}

.van-tabbar-item--active {
    color: #fff;
    background-color: rgb(234, 137, 149);
}
</style>