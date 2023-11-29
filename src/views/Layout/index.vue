<template>
    <Nav></Nav>
    <main>
        <router-view></router-view>
    </main>
    <Footer></Footer>
</template>

<script setup lang="ts">
import Nav from './Nav/Nav.vue';
import Footer from './Footer/Footer.vue';
</script>

<style lang="less" scoped>
main {
    padding: 5vh 0;
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
}
</style>