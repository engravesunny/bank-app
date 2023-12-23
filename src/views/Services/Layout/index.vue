<template>
    <div class="SetLayout">
        <Nav></Nav>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import Nav from './Nav/index.vue'
</script>

<style lang="less" scoped>
.SetLayout {
    box-sizing: border-box;
    padding: 75px 0 0 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background: rgb(174, 193, 237);
}
</style>