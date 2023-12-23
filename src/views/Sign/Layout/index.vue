<template>
    <div class="login-container">
        <Nav></Nav>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import Nav from './Nav/index.vue';
</script>

<style lang="less" scoped>
.login-container {
    box-sizing: border-box;
    padding-top: 75px;
    width: 100vw;
    height: 100vh;
    background-image: url('../../../assets/imgs/u93.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>