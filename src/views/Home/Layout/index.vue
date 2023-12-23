<template>
    <div class="HomeLayout">
        <Nav></Nav>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Footer from './Footer/Footer.vue'
import Nav from './Nav/Nav.vue'
</script>

<style lang="less" scoped>
.HomeLayout {
    box-sizing: border-box;
    padding: 46px 0 50px 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background: linear-gradient(135deg, rgb(167, 192, 254), rgb(243, 129, 133)),
}
</style>